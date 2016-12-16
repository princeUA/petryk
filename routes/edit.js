var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;

exports.get = function (req, res, next) {
    if(!req.role || req.role != "admin"){
        next(new HttpError(403, "Доступ заборонено"));
    } else {
        db.connection.query('SELECT * FROM news WHERE id = ?', req.params.id, function (err, news) {
            if (err) {
                next(err);
            } else {
                res.render('edit', {news: news});
            }
            db.connection.release();
        });
    }
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.action == "editNew") {
        if (!req.role || req.role != "admin") {
            res.end('403');
        } else {
            db.connection.query('UPDATE news SET title = ?, descrip = ?, news = ? WHERE id = ?', [req.body.title, req.body.descrip, req.body.news, req.params.id], function (err) {
                if (err) {
                    next(err);
                } else {
                    res.end('done'); 
                }
                db.connection.release();
            });
        }
    }
};
