var login = require('routes/login');

exports.get = function (req, res) {
    res.render('news');
};

exports.post = function(req, res, next) {
    login.login(req, res, next);

};
