var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    db.pool.getConnection(function(err, connection) {
        if(err) {
            next(err);
        } else {
            connection.query('SELECT * FROM news WHERE id = ?', req.params.id, function(err, news) {
                if(err) {
                    next(err);
                } else {
                    res.render('new', {news: news});
                }
                connection.release();
            });
        }
    });

};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.del == '') {
        db.pool.getConnection(function(err, connection) {
            if(err) {
                next(err);
            } else {
                connection.query('DELETE FROM news WHERE id = ?', req.params.id, function(err){
                    if(err){
                        next(new HttpError(err));
                    } else {
                        res.redirect('/news');
                    }
                    connection.release();
                });
            }
        });
    }

};