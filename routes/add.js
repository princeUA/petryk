var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    if(!req.role || req.role != "admin"){
        next(new HttpError(403, "Доступ заборонено"));
    } else {
        var news;
        res.render('add', {news: news});
    }
};

exports.post = function(req, res, next) {
    if(req.user.role != "admin"){
        next(403);
    }
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.action =="addNew") {
        var time = new Date();
        db.connection.query('INSERT INTO news (title, descrip, news, time) VALUES(?, ?, ?, ?)', [req.body.title, req.body.descrip, req.body.news, time], function(err) {
            if (err) {
                next(err);
            } else {
                res.end("/news");
            }            
        });
    }
};