var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM albums WHERE id = ?', req.params.id, function(err, photos) {
        if(err) {
            next(err);
        } else {
            res.render('photo', {photos: photos});
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
        }
        db.connection.query("UPDATE albums SET photos = ? WHERE id = ?", [req.body.photos, req.params.id], function(err, photos){
            console.log(req.body.photos);
            console.log(req.params.id);
            console.log(photos);
            if(err){
                next(new HttpError(err));
            } else {
                res.end("done");
            }
        })
    }
    else if(req.body.del == '') {
        db.connection.query('DELETE FROM news WHERE id = ?', req.params.id, function(err){
            if(err){
                next(new HttpError(err));
            } else {
                res.redirect('/photos');
            }
        });
    }

};
