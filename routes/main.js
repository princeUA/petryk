var login = require('routes/login');

exports.get = function (req, res) {
    res.render('main');
};

exports.post = function(req, res, next) {
    if(req.body.login == '') {
        login.login(req, res, next);
    }
    else if(req.body.edit == '') {

    }
    
};


    

