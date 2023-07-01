const express=require('express');
const {getAllProducts,cearteProduct, updateProduct, deleteProduct, getProductDetails} = require('../controller/controller');
const { userAuth,Rolecheceker } = require('../middlewares/auth');


const router=express.Router();
router.route("/products").get(getAllProducts)
router.route("/products/new").post(userAuth,Rolecheceker("admin"),cearteProduct)
router.route("/products/:id").put(userAuth,Rolecheceker("admin"),updateProduct)
router.route("/products/:id").delete(userAuth,Rolecheceker("admin"),deleteProduct).get(getProductDetails)

module.exports=router; 