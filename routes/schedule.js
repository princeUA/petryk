var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM schedule WHERE id = 1', function(err, schedule) {
        if(err) {
            next(err);
        } else {
            res.render('schedule', {schedule: schedule});
        }
    });
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.action == "editSchedule"){
        if(!req.role || req.role != "admin"){
            res.end("403");
        } else {
            db.connection.query("UPDATE schedule SET schedule = ? WHERE id = 1", [req.body.schedule], function(err, result){
                if(err){
                    next(new HttpError(err));
                } else {
                    res.end("done");
                }
            });
        }
    }
};

