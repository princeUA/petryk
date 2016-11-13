module.exports = function(req, res, next) {
    res.sendHttpError = function(error) {

        res.status(error.status);
        res.render("error", {error: error});
    };

    next();
};