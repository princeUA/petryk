var user = require('models/user');

exports.get = function (req, res, next) {
    res.render('./registration');
};

exports.post = function (req, res, next) {
    var mail = req.body.mail;
    var name = req.body.name;
    var password = req.body.password; 
    
    user.reg(mail, name, password, function(err) {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};