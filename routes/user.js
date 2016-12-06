var login = require('routes/login');
var HttpError = require('error').HttpError;
var db = require('db');

exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM users WHERE id = ?', req.params.id, function(err, user){
        if(err) {
            next(err);
        } else {
            res.render('user', {user: user});
        }
    });
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }

};
