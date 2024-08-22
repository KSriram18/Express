const Product=require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','views','add-product.html'));
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    // res.render("add-product",{pageTitle:'Add Product',path:'/admin/add-product'});// pug file , render method use default templating engine
    res.render("add-product",{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        activeAddProduct:true,
        productCSS:true,
        formsCSS:true
        });
};

exports.postAddProduct=(req,res,next)=>{
    const product=new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts=(req,res,next)=>{
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // res.render('shop',{prods:products,pageTitle:'Shop',path:'/'});// pug file , render method use default templating engine
    Product.fetchAll((products)=>{
        res.render('shop',{
            prods:products,
            pageTitle:'Shop',
            path:'/',
            hasProducts:products.length>0,
            activeShop:true,
            productCSS:true,
            // layout:false
        });// hbs file , render method use default templating engine
    });
    
}

