import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    birdName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0
    },
    birdType:{
        type: String,
        required: true
    },
    birdImage:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

var productModel = mongoose.model('productTable', productSchema);

export default productModel;