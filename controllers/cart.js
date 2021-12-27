import cartModel from '../models/cartModel.js';
import errorRes from '../utils/errorRes.js';

export const addCart = async (req,res,next) => {
    const {email, birdName, price} = req.body;
    const addCart = new cartModel({
        email,
        birdName,
        price
    });
    try {
        await addCart.save();
        res.status(201).json(addCart)
    } 
    catch (error) {
        return next(error);
    }
}
export const getCart = async (req,res,next) => {
    const {email} = req.body;
    try {
        const cartItem = await cartModel.find({email: email});
        res.status(200).json(cartItem);
    }
    catch { 
        return next(error);
    }
}
export const clearCart = async (req,res,next) => {
    const {_id} = req.body;
    try {
        const cartItem = await cartModel.find({_id: _id});
        if (cartItem) {
            try {
                await cartModel.findByIdAndDelete(_id);
                res.json({message: "item clear from cart successfully"});
            }
            catch {
                return next(error);
            }
        }       
    }
    catch {
        return next( new errorRes("Cannot find the product ID or email", 401));
    }
}
export const clearAllCart = async (req,res,next) => {
    const {email} = req.body;
    try {
        const check = await cartModel.findOne({email});
        if (check) {
            try {
                await cartModel.deleteMany({email: email});
                res.json({message: "empty cart successfully"});
            }
            catch (error) {
                return next(error);
            }
        }
    }
    catch (error) {
        return next(error);
    }
}