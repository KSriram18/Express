const express=require('express');

const bodyParser=require('body-parser');

// const expressHbs=require('express-handlebars');

const path=require('path');

const app=express();

const errorController=require('./controllers/error');

const User=require('./models/user');

const mongoConnect=require('./util/database').mongoConnect;


// app.set('view engine','pug');
// app.engine('hbs',expressHbs.engine({
//     layoutDir:'views/layouts/',
//     defaultLayout:'main-layout',
//     extname:'hbs'
// }))
// app.set('view engine','hbs');
app.set('view engine','ejs');
app.set('views','views');

app.use((req,res,next)=>{
    User.findById('66e77f443acea329a45e0b46')
    .then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err=>console.log(err));
});

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes); 
app.use(shopRoutes); 

app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3500);
})
