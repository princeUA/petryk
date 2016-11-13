module.exports = function(req, res, next) {
    req.user = res.locals.user = null;

    if (!req.session.user) {
        return next();

    } else {
        var user = req.user = res.locals.user = req.session.user;
        console.log('Юзера завантажено ' + user);
        next();
    }
};