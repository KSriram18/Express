const express=require('express');

const path=require('path');

const rootDir=require('../util/path');

const router=express.Router();

const shopController= require('../controllers/shop');

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);
// ":" which tells it is dynamic segment, place more specific route above the dynamic route

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);

module.exports=router;