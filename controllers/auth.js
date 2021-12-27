import crypto from 'crypto';
import userModel from '../models/userModel.js';
import errorRes from '../utils/errorRes.js';
import sendEmail from '../utils/sendEmail.js';

export const signUpPost = async (req,res,next) => {
    const {fullName,email,password} = req.body;
    try {
        const check = await userModel.findOne({email});
        if (check) {
            return next(new errorRes("Email already exist in the system.", 401));
        }
    }
    catch (error) {
        return (error);
    }
    try {
        const user =  await userModel.create({
            fullName,
            email,
            password
        });
        sendToken(user,201,res);
    }
    catch (error) {
        return next(error);
    }
};

export const signInPost = async (req,res,next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new errorRes("please provide email and password", 400));
    }
    try {
        const user = await userModel.findOne({email}).select("+password");
        if (!user) {
            return next(new errorRes("Invalid credentials", 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorRes("Invalid credentials", 401));
        }
        sendToken(user,200,res);
    }
    catch {
        return next(new errorRes("server not working",500))
    }

};

export const forgotPasswordPost = async (req,res,next) => {
    const {email} = req.body;
    
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return next(new errorRes("Email doesn't exist in database", 404));
        }

        const resetToken = user.getResetPasswordToken();
        await user.save();

        const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>
            please go to this link to reset your password <br/> 
            (Note: this link will only valid for 10mins, and work only once)</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "password reset request",
                text: message
            });
            res.status(200).json({
                sucess: true,
                data: "Email has been send. Please check your inbox."
            });
        } 
        catch (error) {
            user.getResetPasswordToken = undefined;
            user.getResetPasswordExpire = undefined;

            await user.save();
            return next(new errorRes("Email could not be send ", 500));

        }
    }
    catch (error) {
        next(error);
    }
};

export const resetPasswordPost = async (req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new errorRes('invalid reset token', 400))
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            sucess: true,
            data: "password reset success"
        })
    } 
    catch (error) {
        next(error)
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({sucess : true, token})
}