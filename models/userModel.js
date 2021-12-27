import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    date:{
        type: Date,
        default: new Date()
    }
});

userSchema.pre("save", async function(next) {
    //hash the password before it get save
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.getSignedToken = function() {
    return jwt.sign(
        {id: this._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE}
    );
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    //token last 10 mins for reset password
    this.resetPasswordExpire = Date.now() + 10 * (60*1000);

    return resetToken;
}

var userModel = mongoose.model('userTable', userSchema);

export default userModel;