const Product=require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    // res.sendFile(path.join(__dirname,'..','views','add-product.html'));
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    // res.render("add-product",{pageTitle:'Add Product',path:'/admin/add-product'});// pug file , render method use default templating engine
    //    if(!req.session.isLoggedIn){
    //         return res.redirect('/login');
    //    } 
    res.render("admin/edit-product",{
            pageTitle:'Add Product',
            path:'/admin/add-product',
            editing: false
            });
};

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description; 
    const product=new Product({
        title:title,
        price:price,
        description:description,
        imageUrl:imageUrl,
        // userId:req.user._id
        userId:req.user
    });
    product.save()
    .then((result)=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
};

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;// query parameters always string
    if(!editMode){
        return res.redirect('/');
    }
    const prodId=req.params.productId;
    Product.findById(prodId)
    .then((product)=>{
        if(!product){
            return res.redirect('/');
        }
        res.render("admin/edit-product",{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err=>console.log(err)); 
};
exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    const updatedTitle=req.body.title;
    const updatedImageUrl=req.body.imageUrl;
    const updatedPrice=req.body.price;
    const updatedDesc=req.body.description;

    Product.findById(prodId)
    .then(product=>{
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.description=updatedDesc;
        product.imageUrl=updatedImageUrl;
        console.log(product);
        product.save();
    })
    .then(result=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err)); 
};

exports.getProducts=(req,res,next)=>{
    Product.find()
    // .select('title price -_id')
    // .populate('userId','name')
    .then((products)=>{
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        });
    })
    .catch(err=>console.log(err));
};

exports.postDeleteProduct=(req,res,next)=>{
    const prodId=req.body.productId;
    Product.findByIdAndDelete(prodId)
    .then(()=>{
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
    // Product.destroy({where:{id:prodId}})
    // .then(result=>{
    //     res.redirect('/admin/products');
    // })
    // .catch(err=>console.log(err));
};
