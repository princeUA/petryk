var login = require('routes/login');
var db = require('db');


exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM albums', function(err, albums) {
        if(err){
            next(err);
        } else {
            res.render('photos', {albums: albums});
        }
    });

};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
};
