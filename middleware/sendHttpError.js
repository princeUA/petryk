module.exports = function(req, res, next) {
    res.sendHttpError = function(err) {
        res.status(err.status);
        if(res.req.headers["x-requested-with"] == "XMLHttpReques"){
            res.json(err)
        }
        res.render("error", {err: err});
    };
    next();
};