const express=require('express');

const path=require('path');

const rootDir=require('../util/path');

const adminController= require('../controllers/admin');

const isAuth=require('../middleware/is-auth');

const router=express.Router();

// /admin/add-product-GET
router.get('/add-product',isAuth,adminController.getAddProduct);

router.get('/products',isAuth,adminController.getProducts);

// /admin/add-product-POST

router.post('/add-product',isAuth,adminController.postAddProduct);

router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);
// // query parameters can be added by ? by using key value pairs with = between them separted by & , path is determined upto the question mark

router.post('/edit-product',isAuth,adminController.postEditProduct);

router.post('/delete-product',isAuth,adminController.postDeleteProduct);

module.exports=router;