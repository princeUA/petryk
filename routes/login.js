var user = require('models/user');
var HttpError = require('error').HttpError;
var db = require('db.js');

exports.login = function (req, res, next) {
    if(!req.session.user) {
        var mail = req.body.mail;
        var password = req.body.password;

        user.check(mail, password, function (err, user) {
            if (err) {
                return next(err);
            }
            req.session.user = user[0];
            res.redirect('#');
        });
    } else {
        req.session.destroy();
        res.redirect('#');
    }
};


