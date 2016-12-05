module.exports = function(req, res, next) {
    res.sendHttpError = function(err) {
        res.status(err.status);
        if(res.req.headers["x-requested-with"] == "XMLHttpRequest"){
            res.json(err);
        } else {
            res.render("error", {err: err});
        }
    };
    next();
};