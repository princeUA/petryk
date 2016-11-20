var mysql      = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host     : '172.30.183.76',
    port     : 3306,
    user     : 'princeUA',
    password : 'Marconi92',
    database : 'petrykdb'
};
var connection = mysql.createConnection(options);
var mySession = new MySQLStore(options);
exports.connection = connection;
exports.mySession = mySession;
