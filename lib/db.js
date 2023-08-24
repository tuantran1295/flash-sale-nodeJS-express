var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root-1234567890',
    database: 'flash_sale_db'
});
connection.connect(function (error) {
   if (!error) {
       console.log(error);
   } else {
       console.log('DB connected successfully!!!');
   }
});

module.exports = connection;