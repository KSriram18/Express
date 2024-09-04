const mysql=require('mysql2');

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'Viratkohli@18'
});// pass object which contains details of the database , sql server is in local machine so host is local host

module.exports=pool.promise();// promise for asynchronous tasks