const express=require('express');

const path=require('path');

const rootDir=require('../util/path');

const adminController= require('../controllers/admin');

const router=express.Router();

// /admin/add-product-GET
router.get('/add-product',adminController.getAddProduct);

router.get('/products',adminController.getProducts);

// /admin/add-product-POST

router.post('/add-product',adminController.postAddProduct);

router.get('/edit-product/:productId',adminController.getEditProduct);
// // query parameters can be added by ? by using key value pairs with = between them separted by & , path is determined upto the question mark

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);

module.exports=router;