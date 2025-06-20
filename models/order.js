const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const orderSchema=mongoose.Schema({
    products:[{
        product:{type:Object,required:true},
        quantity:{type:Number,required:true}
    }],
    user:{
        email:{type:String,required:true},
        userId:{type:Schema.Types.ObjectId,required:true,ref:"user"}

    }
});


module.exports=mongoose.model('Order',orderSchema);