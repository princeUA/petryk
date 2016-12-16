var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    if(!req.role || req.role != "admin"){
        next(new HttpError(403, "Доступ заборонено"));
    } else {
        var albums;
        res.render('addalbum', {albums: albums});
    }
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    } else if(req.body.action =="addAlbum") {
        if (!req.role || req.role != "admin") {
            res.end('403');
        } else {
            var time = new Date();
            db.connection.query('INSERT INTO albums (title, photo) VALUES(?, ?)', [req.body.title, req.body.photo], function (err) {
                if (err) {
                    next(err);
                } else {
                    res.end("done");
                }
                db.connection.release();
            });
        }
    }
};
