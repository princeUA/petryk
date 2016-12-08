var user = require('models/user');
var HttpError = require('error').HttpError;

exports.post = function (req, res, next) {
    if (!req.session.user) {
        var mail = req.body.mail;
        var password = req.body.password;
        user.check(mail, password, function (err, user) {
            if (err) {
                if (err == "errLogin" ) {
                    res.end("errLogin");
                } else {
                    return next(err);
                }
            } else {
                req.session.user = user[0];
                var user = {login: user[0].login, image: user[0].image};
                res.json(user);
            }
        });
    } else {
        req.session.destroy();
        res.end("logedOut");
    }
};


