const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'jwellery_database'
})
db.connect(function(err) {
    if (err) throw err;
    console.log("database Connected!");
  });
module.exports=db