const Product=require('../models/product');
// const Cart=require('../models/cart');
// const Order=require('../models/order');


exports.getProducts=(req,res,next)=>{
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // res.render('shop',{prods:products,pageTitle:'Shop',path:'/'});// pug file , render method use default templating engine
    Product.findAll()
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
    Product.findAll({where:{id:prodId}})
    .then((products)=>{
        res.render('shop/product-detail',{
            product:products[0],
            pageTitle:products[0].title,
            path:'/products',
        })
    })
    .catch(err=>console.log(err));

    // Product.findByPk(prodId)
    // .then((product)=>{
    //     res.render('shop/product-detail',{
    //         product:product,
    //         pageTitle:product.title,
    //         path:'/products'
    //     });
    // })
    // .catch(err=>console.log(err));  
};

exports.getIndex=(req,res,next)=>{
    Product.findAll()
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
    .then(cart=>{
        return cart.getProducts()
    })
    .then(products=>{
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
    let fetchedCart;
    let newQuantity;
    req.user.getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts({where:{id:prodId}});
    })
    .then(products=>{
        let product;
        if(products.length>0){
            product=products[0];
        }
        newQuantity=1;
        if(product){
            const oldQuantity=product.cartItem.quantity;
            newQuantity=oldQuantity+1;
            return product;
        }
        return Product.findByPk(prodId)   
        })
        .then(product=>{
            return fetchedCart.addProduct(product,{through:{quantity:newQuantity}}); 
        })
        .then(result=>{
            res.redirect('/cart');
        })
        .catch(err=>console.log(err));
};

exports.postCartDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    req.user.getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:prodId}});
    })
    .then(products=>{
        const product=products[0];
        product.cartItem.destroy();
    })
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>console.log(err));
};

exports.getOrders=(req,res,next)=>{
    req.user.getOrders({include:['products']})
    .then(orders=>{
        res.render('shop/orders',{
            pageTitle:'Your Orders',
            path:'/orders',
            orders:orders
        });
    })
    .catch(err=>console.log(err));
};

exports.postOrder=(req,res,next)=>{
    let fetchedCart;
    req.user.getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts();
    })
    .then(products=>{
        return req.user.createOrder()
        .then(order=>{
            return order.addProducts(products.map(product=>{
                product.orderItem={quantity:product.cartItem.quantity};
                return product;
            }))
        })
        .catch(err=>console.log(err));
    })
    .then(result=>{
        res.redirect('/orders');
    })
    .catch(err=>console.log(err));
};
