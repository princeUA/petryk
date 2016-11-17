var login = require('routes/login');
var db = require('db.js');

exports.get = function (req, res) {
    res.render('news');
};

exports.post = function(req, res, next) {
    login.login(req, res, next);

};
