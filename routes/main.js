var login = require('routes/login');
var HttpError = require('error').HttpError;
var db = require('db');

exports.get = function (req, res, next) {
    db.connection.query('SELECT main FROM main WHERE id = 1', function(err, main){
        if(err) {
            next(err);
        } else {
            res.render('main', {main: main}); 
        }        
    });    
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.edit == '') {

    }
    
};


    

