var login = require('routes/login');
var db = require('db');
var HttpError = require('error').HttpError;


exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM contacts WHERE id = 1', function(err, contacts) {
        if(err) {
            next(err);
        } else {
            res.render('contacts', {contacts: contacts});
        }
    });
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.action == "editContacts"){
        if(!req.role || req.role != "admin"){
            res.end("403");
        } else {
            db.connection.query("UPDATE contacts SET contacts = ? WHERE id = 1", [req.body.contacts], function(err, result){
                if(err){
                    next(new HttpError(err));
                } else {
                    res.end("done");
                }
            });
        }
    } 
};
