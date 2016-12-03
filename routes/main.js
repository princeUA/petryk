var login = require('routes/login');
var HttpError = require('error').HttpError;
var db = require('db');

exports.get = function (req, res, next) {
    db.connection.query('SELECT main FROM main', function(err, main){
        if(err) {
            next(err);
        }
        res.render('main', {main: main[0].main});
    });    
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.edit == '') {

    }
    
};


    

