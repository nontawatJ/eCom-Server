import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';  
import errorRes from '../utils/errorRes.js';

export const protect = async (req,res,next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        console.log(token)
        return next(new errorRes("Not authorized to access this route 1", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return next(new errorRes("No user found with this ID", 404));
        }
        req.user = user;
        next();
    }
    catch (error) {
        return next(new errorRes("Not authorized to access this route 2", 401));
    }
}