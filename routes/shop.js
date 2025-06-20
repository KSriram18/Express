const express=require('express');

const path=require('path');

const rootDir=require('../util/path');

const router=express.Router();

const shopController= require('../controllers/shop');

const isAuth=require('../middleware/is-auth');

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);
// ":" which tells it is dynamic segment, place more specific route above the dynamic route

router.get('/cart',isAuth,shopController.getCart);

router.post('/cart',isAuth,shopController.postCart);

router.post('/cart-delete-item',isAuth,shopController.postCartDeleteProduct);

router.post('/create-order',isAuth,shopController.postOrder);

router.get('/orders',isAuth,shopController.getOrders);

module.exports=router;