var login = require('routes/login');
var db = require('db');


exports.get = function (req, res, next) {
    if(!req.role || req.role != "admin"){
        next(403);
    }
    var news;
    res.render('add',{news: news});
};

exports.post = function(req, res, next) {
    if(req.user.role != "admin"){
        next(403);
    }
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.action =="addNew") {
        db.connection.query('INSERT INTO news (title, descrip, news) VALUES(?, ?, ?)', [req.body.title, req.body.descrip, req.body.news], function(err) {
            if (err) {
                next(err);
            }
            res.end("/news");
        });
    }
};