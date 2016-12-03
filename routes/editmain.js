var login = require('routes/login');
var db = require('db');


exports.get = function (req, res, next) {
    db.connection.query('SELECT main FROM main', function(err, main){
        if(err) next(err);
        res.render('editmain', {main: main[0].main});
    });

};

exports.post = function(req, res, next) {
    if (req.body.login == '') {
        login.login(req, res, next);
    }
    else if (req.body.action == "editMain") {
        db.connection.query('UPDATE main SET  main = ? WHERE id = 1', [req.body.main], function (err) {
            if (err) {
                next(err);
            }
            res.end('/');
        });
    }
};
