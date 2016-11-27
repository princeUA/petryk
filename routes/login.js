var user = require('models/user');
var HttpError = require('error').HttpError;

exports.post = function (req, res, next) {
    if (!req.session.user) {
        console.log('111');
        var mail = req.body.mail;
        var password = req.body.password;
        user.check(mail, password, function (err, user) {

            if (err) {

                if (err == "errMail") {

                    res.end("errLogin");
                } else if (err == "errPass") {
                    res.end("errLogin");
                } else {
                    return next(err);
                }
            } else {
                req.session.user = user[0];
                var user = res.locals.user = user[0].name
                res.end(user);
            }
        });
    } else {

        req.session.destroy();
        res.end("logedOut");
    }
};


