const express=require('express');

const bodyParser=require('body-parser');

// const expressHbs=require('express-handlebars');

const path=require('path');

const mongoose = require('mongoose');

const errorController=require('./controllers/error');

const User=require('./models/user');

const session=require('express-session'); 

const csrf=require('csurf');

// const cookieParser = require('cookie-parser');

const flash=require('connect-flash');

const MongoDBStore=require('connect-mongodb-session')(session);

const csrfProtection=csrf();

const app=express();


const MongoDB_URI='mongodb://127.0.0.1:27017/shop';

const store=new MongoDBStore({
    uri:MongoDB_URI,
    collection:'sessions'
})
// app.set('view engine','pug');
// app.engine('hbs',expressHbs.engine({
//     layoutDir:'views/layouts/',
//     defaultLayout:'main-layout',
//     extname:'hbs'
// }))
// app.set('view engine','hbs');
app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,// here we can configuration of our cookie
    store:store,
}));

// app.use(cookieParser());

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err));
});

app.use((req,res,next)=>{
    
  res.locals.isAuthenticated=req.session.isLoggedIn;
  res.locals.csrfToken=req.csrfToken();
  next();
});

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const authRoutes=require('./routes/auth');

app.use('/admin',adminRoutes); 
app.use(shopRoutes); 
app.use(authRoutes); 

app.use(errorController.get404);

mongoose.connect(MongoDB_URI)
.then(result=>{
    app.listen(3500);
})
.catch(err=> console.log(err));
