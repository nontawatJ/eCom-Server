import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    products:[{
        birdName: String,
        price: Number             
    }],
    totalPrice:{
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Processing"
    },
    orderDate: {
        type: Date,
        default: new Date()
    }
});

var orderModel = mongoose.model('orderTable', orderSchema);

export default orderModel;