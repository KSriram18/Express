const express=require('express');

const bodyParser=require('body-parser');

// const expressHbs=require('express-handlebars');

const path=require('path');

const app=express();

const mongoose = require('mongoose');

const errorController=require('./controllers/error');

const User=require('./models/user');


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
    User.findById('66ead644e29a22ab00812056')
    .then(user=>{
        req.user=user
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

mongoose.connect("mongodb://127.0.0.1:27017/shop")
.then(result=>{
    User.findOne().
    then(user=>{
        if(!user){
            const user=new User({
                name:'Max',
                email:'Max@test.com',
                cart:{items:[]}
            });
         user.save()
        }
    });
    app.listen(3500)
})
.catch(err=> console.log(err));
