const Sequelize= require('sequelize');

const sequelize=new Sequelize('node-complete','root','Viratkohli@18',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;