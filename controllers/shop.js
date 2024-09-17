const Product=require('../models/product');
// const Cart=require('../models/cart');
// const Order=require('../models/order');


exports.getProducts=(req,res,next)=>{
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // res.render('shop',{prods:products,pageTitle:'Shop',path:'/'});// pug file , render method use default templating engine
    Product.fetchAll()
    .then((products)=>{
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'All Products',
            path:'/products',
            // hasProducts:products.length>0,
            // activeShop:true,
            // productCSS:true,
            // layout:false
        });// hbs file , render method use default templating engine
    })
    .catch(err=>console.log(err));  
};

exports.getProduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId)
    .then((product)=>{
        res.render('shop/product-detail',{
            product:product,
            pageTitle:product.title,
            path:'/products',
        })
    })
    .catch(err=>console.log(err)); 
};

exports.getIndex=(req,res,next)=>{
    Product.fetchAll()
    .then((products)=>{
        res.render('shop/index',{
            prods:products,
            pageTitle:'Shop',
            path:'/',
        })
    })
    .catch(err=>console.log(err));
};

exports.getCart=(req,res,next)=>{
    req.user.getCart()
    .then(products=>{
        console.log(products);
        res.render('shop/cart',{
                    pageTitle:'Your Cart',
                    path:'/cart',
                    products:products
                });
    })
    .catch((err)=>console.log(err));
};

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId)
    .then(product=>{
         return req.user.addToCart(product);
    })
    .then(result=>{
        console.log(result);
        res.redirect('/cart');
    })
    .catch(err=>console.log(err));
};

exports.postCartDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    req.user.deleteItemFromCart(prodId)
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>console.log(err));
};

exports.getOrders=(req,res,next)=>{
    req.user.getOrders()
    .then(orders=>{
        console.log(orders);
        res.render('shop/orders',{
            pageTitle:'Your Orders',
            path:'/orders',
            orders:orders
        });
    })
    .catch(err=>console.log(err));
};

exports.postOrder=(req,res,next)=>{
    req.user.addOrder()
    .then(result=>{
        res.redirect('/orders');
    })
    .catch(err=>console.log(err));
};
