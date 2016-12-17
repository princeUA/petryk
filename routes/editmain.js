var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;

exports.get = function (req, res, next) {
    if(!req.role || req.role != "admin"){
        next(new HttpError(403, "Доступ заборонено"));
    } else {
        db.pool.getConnection(function(err, connection) {
            if(err) {
                next(err);
            } else {
                connection.query('SELECT main FROM main', function (err, main) {
                    if (err){
                        next(err);
                    } else {
                        res.render('editmain', {main: main[0].main});
                    }
                    connection.release();
                });
            }
        });
    }
};
exports.post = function(req, res, next) {
    if (req.body.login == '') {
        login.login(req, res, next);
    } else if(req.body.action == "editMain") {
        if(!req.role || req.role != "admin") {
            res.end('403');
           
        } else {
            db.pool.getConnection(function(err, connection) {
                if(err) {
                    next(err);
                } else {
                    connection.query('UPDATE main SET  main = ? WHERE id = 1', [req.body.main], function (err) {
                        if (err) {
                            next(err);
                        } else {
                            res.send('done');
                        }
                        connection.release();
                    });
                }
            });
        }
    }
};
