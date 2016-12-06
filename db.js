var mysql      = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host     : 'eu-cdbr-west-01.cleardb.com',
    port     : 3306,
    user     : 'b59d010cb69e4f',
    password : 'ef8ab4b5',
    database : 'heroku_da8102afa750f98'
};

var pool  = mysql.createPool(options);

//var connection = mysql.createConnection(options);

var mySession = new MySQLStore(options);
exports.connection = pool;
exports.mySession = mySession;