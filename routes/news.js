var login = require('routes/login');
var db = require('db');


exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM news', function(err, news) {
        if(err) next(err);
        res.render('news', {news: news});
    });

};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
};