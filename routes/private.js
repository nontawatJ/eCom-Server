import express from 'express';
import {getPrivateData} from '../controllers/privates.js';
import {protect} from '../middleware/protectAuth.js';
import {addCart, getCart, clearCart, clearAllCart} from '../controllers/cart.js';
import {addOrder, getAllOrders, getUserAllOrders, getProcessingOrders, getConfirmOrders, confirmOrder, deleteOrder} from '../controllers/order.js';

const router = express.Router();

router.route("/").get(protect, getPrivateData);
router.route("/addCart").post(addCart);
router.route("/getCart").post(getCart);
router.route("/clearCart").post(clearCart);
router.route("/clearAllCart").post(clearAllCart);
router.route("/addOrder").post(addOrder);
router.route("/getAllOrders").get(getAllOrders);
router.route("/getUserAllOrders").post(getUserAllOrders);
router.route("/confirmOrder").post(confirmOrder);
router.route("/deleteOrder").post(deleteOrder);
router.route("/getProcessingOrders").get(getProcessingOrders);
router.route("/getConfirmOrders").get(getConfirmOrders);

export default router;