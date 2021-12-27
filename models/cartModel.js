import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    birdName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0
    }
});

var cartModel = mongoose.model('cartTable', cartSchema);

export default cartModel;