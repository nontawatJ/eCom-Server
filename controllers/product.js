import productModel from '../models/productModel.js';
import errorRes from '../utils/errorRes.js';

export const uploadProductPost = async (req,res,next) => {
    const {birdName, description, price, birdType, birdImage} = req.body;

    const newProduct = new productModel({
        birdName,
        description,
        price,
        birdType,
        birdImage
    });
    try {
        await newProduct.save();
        res.status(201).json(newProduct)
    } 
    catch (error) {
        return next(error);
    }
};

export const getProduct = async (req,res,next) => {
    try {
        const productInfo = await productModel.find({});
        res.status(200).json(productInfo);
    }
    catch {
        return next(error);
    }
};

export const getSmallBirdProduct = async (req,res,next) => {
    try {
        const smallBirdProduct = await productModel.find({birdType:"Small Bird"});
        res.status(200).json(smallBirdProduct);
    }
    catch {
        return next(error);
    }
}
export const getMediumBirdProduct = async (req,res,next) => {
    try {
        const mediumBirdProduct = await productModel.find({birdType:"Medium Bird"});
        res.status(200).json(mediumBirdProduct);
    }
    catch {
        return next(error);
    }
}
export const getLargeBirdProduct = async (req,res,next) => {
    try {
        const largeBirdProduct = await productModel.find({birdType:"Large Bird"});
        res.status(200).json(largeBirdProduct);
    }
    catch {
        return next(error);
    }
}

export const deleteProduct = async (req,res,next) => {
    const {_id} = req.body;
    try {
        const check = await productModel.findOne({_id});
        if (check) {
            try {
                await productModel.findByIdAndDelete(_id);
                res.json({message: "Product deleted successfully"});
            }
            catch (error) {
                return next(error);
            }
        }
    }
    catch (error) {
        return next( new errorRes("Cannot find the product ID", 401));
    }
}

export const editProduct = async (req,res,next) => {
    const {_id,birdName, description, price, birdType, birdImage} = req.body;
    try {
        const check = await productModel.findOne({_id});
        if (check) {
            try {
                const updateProduct = {birdName,description,price,birdType,birdImage, _id}
                await productModel.findByIdAndUpdate(_id,updateProduct, {new: true});
                res.json({message: "Product update successfully"});
            }
            catch (error) {
                return next(error);
            }
        }
    }
    catch (error) {
        return next( new errorRes("Cannot find the product ID", 401));
    }
}

