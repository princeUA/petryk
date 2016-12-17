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
    if(req.body.login == '') {
        login.login(req, res, next);
    } else if(req.body.action =="addNew") {
        if (!req.role || req.role != "admin") {
            res.end('403');
        } else {
            var time = new Date();
            db.pool.getConnection(function(err, connection) {
                if(err) {
                    next(err);
                } else {
                    connection.query('INSERT INTO news (title, descrip, news, time) VALUES(?, ?, ?, ?)', [req.body.title, req.body.descrip, req.body.news, time], function (err) {
                        if (err) {
                            next(err);
                        } else {
                            res.end("done");
                        }
                        connection.release();
                    });
                }
            });
        }
    }
};