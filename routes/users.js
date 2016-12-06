var login = require('routes/login');
var HttpError = require('error').HttpError;
var db = require('db');

exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM users', function(err, users){
        if(err) {
            next(err);
        } else {
            res.render('users', {users: users});
        }
    });
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }

};