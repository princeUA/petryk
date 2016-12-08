module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    req.role = res.locals.role = null;
    req.image = res.locals.image = null;

    if (!req.session.user) {
        return next();

    } else {
        req.user = res.locals.user = req.session.user.login;
        req.role = res.locals.role = req.session.user.role;
        req.image = res.locals.image = req.session.user.image;
        next();
    }
};