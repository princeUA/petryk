var login = require('routes/login');
var db = require('db');


exports.get = function (req, res, next) {
    db.connection.query('SELECT * FROM news WHERE id = ?', req.params.id, function(err, news){
        if(err) next(err);
        res.render('edit', {news: news});
    });

};

exports.post = function(req, res, next) {

    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.send == '') {
        db.connection.query('UPDATE news SET title = ?, descrip = ?, news = ? WHERE id = ?', [req.body.title, req.body.descrip, req.body.news, req.params.id], function(err) {
            if (err) {
                next(err);
            }
            res.redirect('/news');
        });
    }
};
