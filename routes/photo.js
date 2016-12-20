var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    db.pool.getConnection(function(err, connection) {
        if(err) {
            next(err);
        } else {
            connection.query('SELECT * FROM albums WHERE id = ?', req.params.id, function(err, photos) {
                if(err) {
                    next(err);
                } else {
                    res.render('photo', {photos: photos});
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
    else if(req.body.action == "editPhotos"){
        if(!req.role || req.role != "admin"){
            res.end("403");
        } else {
            db.pool.getConnection(function(err, connection) {
                if(err) {
                    next(err);
                } else {
                    connection.query("UPDATE albums SET photos = ? WHERE id = ?", [req.body.photos, req.params.id], function(err, photos){
                        if(err){
                            next(new HttpError(err));
                        } else {
                            res.end("done");
                        }
                        connection.release();
                    });
                }
            });
        }        
    }
    else if(req.body.del == '') {
        if(!req.role || req.role != "admin"){
            res.end("403");
        } else {
            db.pool.getConnection(function(err, connection) {
                if(err) {
                    next(err);
                } else {
                    connection.query('DELETE FROM albums WHERE id = ?', req.params.id, function(err){
                        if(err){
                            next(new HttpError(err));
                        } else {
                            res.redirect('/photos');
                        }
                        connection.release();
                    });
                }
            });
        }
        
    }

};
