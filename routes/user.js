var login = require("routes/login");
var HttpError = require("error").HttpError;
var db = require("db");

exports.get = function (req, res, next) {
    db.pool.getConnection(function(err, connection) {
        if(err) {
            next(err);
        } else {
            connection.query("SELECT * FROM users WHERE id = ?", req.params.id, function(err, user){
                if(err) {
                    next(err);
                } else {
                    res.render("user", {user: user});
                }
                connection.release();
            });
        }
    });
};

exports.post = function(req, res, next) {
    console.log(req.body);
    if(req.body.login == "") {
        login.login(req, res, next);
    } else if(req.body.confRole == ""){
        db.pool.getConnection(function(err, connection) {
            if(err) {
                next(err);
            } else {
                connection.query('UPDATE users SET role = ? WHERE id = ?', [req.body.role, req.params.id], function(err){
                    if(err) {
                        next(err);
                    } else {
                        res.redirect("#");
                    }
                    connection.release();
                });
            }
        });
    }
};
