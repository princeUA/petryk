var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var db = require('db.js');

var HttpError = require('error').HttpError;


var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(express.favicon());
if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}
app.use(express.json());
app.use(express.urlencoded()); // req.body

app.use(express.cookieParser()); //req.cookies

app.use(express.session({
    secret: config.get('session:secret'),
    cookie: config.get('session:cookie'),
    store: db.mySession
}));

app.use(require('middleware/loadUser'));

app.use(require('middleware/sendHttpError'));

app.use(app.router);

require('routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
    if(typeof err == 'number') {
        err = new HttpError(err);
    }
    if(err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            var errorHandler = express.errorHandler();
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

http.createServer(app).listen(process.env.PORT || 3000, function () {
    log.info('Express server listening on port ' + process.env.PORT);
});
