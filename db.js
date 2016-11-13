var mysql      = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'MarconiUA',
    database : 'petryk'
};
var connection = mysql.createConnection(options);
var mySession = new MySQLStore(options);
exports.connection = connection;
exports.mySession = mySession;