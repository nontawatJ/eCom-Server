import userModel from '../models/userModel.js';
import cartModel from '../models/cartModel.js';
import orderModel from '../models/orderModel.js';
import productModel from '../models/productModel.js';
import errorRes from '../utils/errorRes.js';

export const cleanning = async (req,res,next) => {
    try {
        await userModel.remove({});
        try {
            await cartModel.remove({});
            try {
                await orderModel.remove({});
                try {
                    await productModel.remove({});
                    res.json({message: "cleanning successfully"});
                }
                catch {
                    return next( new errorRes("product delete fail", 401))
                }
            }
            catch {
                return next( new errorRes("order delete fail", 401))
            }
        }
        catch {
            return next( new errorRes("cart delete fail", 401))
        }
    }
    catch {
        return next( new errorRes("user delete fail", 401))
    }
}
