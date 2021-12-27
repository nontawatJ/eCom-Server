import orderModel from '../models/orderModel.js';
import errorRes from '../utils/errorRes.js';

export const addOrder = async (req,res,next) => {
    const {email, products, totalPrice} = req.body;
    const addOrder = new orderModel({
        email,
        products,
        totalPrice
    });
    try {
        await addOrder.save();
        res.status(201).json(addOrder)
    } 
    catch (error) {
        return next(error);
    }
} 
export const getAllOrders = async (req,res,next) => {
    try {
        const allOrderInfo = await orderModel.find({});
        res.status(200).json(allOrderInfo);
    }
    catch {
        return next(error);
    }
};
export const getUserAllOrders = async (req,res,next) => {
    const {email} = req.body;
    try {
        const userOrders = await orderModel.find({email: email});
        res.status(200).json(userOrders);
    }
    catch { 
        return next(error);
    }
}
export const getProcessingOrders = async (req,res,next) => {
    const status = "Processing";
    try {
        const processingOrders = await orderModel.find({status: status});
        res.status(200).json(processingOrders);
    }
    catch{
        return next(error);
    }
}
export const getConfirmOrders = async (req,res,next) => {
    const status = "Confirm";
    try {
        const confirmOrders = await orderModel.find({status: status});
        res.status(200).json(confirmOrders);
    }
    catch{
        return next(error);
    }
}
export const confirmOrder = async (req,res,next) => {
    const {_id} = req.body;
    try {
        const check = await orderModel.findOne({_id});
        if (check) {
            try {
                const updateStatus = "Confirm";
                await orderModel.findByIdAndUpdate(_id, {status: updateStatus});
                res.json({message: "order update successfully"});
            }
            catch (error) {
                return next(error);
            }
        }
    }
    catch (error) {
        return next( new errorRes("Cannot find the order ID", 401));
    }
}
export const deleteOrder = async (req,res,next) => {
    const {_id} = req.body;
    try {
        const check = await orderModel.findOne({_id});
        if (check) {
            try {
                await orderModel.findByIdAndDelete(_id);
                res.json({message: "order deleted successfully"});
            }
            catch (error) {
                return next(error);
            }
        }
    }
    catch (error) {
        return next( new errorRes("Cannot find the order ID", 401));
    }
}