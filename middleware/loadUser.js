module.exports = function(req, res, next) {
    req.user = res.locals.user = null;
    req.role = res.locals.role = null;

    if (!req.session.user) {
        return next();

    } else {
        req.user = res.locals.user = req.session.user.name;
        req.role = res.locals.role = req.session.user.role;
        next();
    }
};