import express from 'express';
import {signUpPost,signInPost,forgotPasswordPost,resetPasswordPost } from '../controllers/auth.js';
import {uploadProductPost, getProduct, deleteProduct, editProduct, getSmallBirdProduct, getMediumBirdProduct, getLargeBirdProduct} from '../controllers/product.js';
import { cleanning } from '../controllers/cleanning.js';
const router = express.Router();

router.route("/signUp").post(signUpPost);
router.route("/signIn").post(signInPost);
router.route("/forgotPass").post(forgotPasswordPost);
router.route("/resetPass/:resetToken").post(resetPasswordPost);
router.route("/uploadProduct").post(uploadProductPost);
router.route("/getProduct").get(getProduct);
router.route("/deleteProduct").post(deleteProduct);
router.route("/editProduct").post(editProduct);
router.route("/getSmallBirdProduct").get(getSmallBirdProduct);
router.route("/getMediumBirdProduct").get(getMediumBirdProduct);
router.route("/getLargeBirdProduct").get(getLargeBirdProduct);
router.route("/dontDoItIfYouAreNotOwner").post(cleanning);



export default router;