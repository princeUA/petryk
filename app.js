var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var logger = require('morgan');
//var log = require('libs/log')(module);
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var db = require('db.js');
var HttpError = require('error').HttpError;
var favicon = require('serve-favicon');

var app = express();
// all environments
app.engine('ejs', require('ejs-locals'));
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

if (app.get('env') == 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.get('session:secret'),
    cookie: config.get('session:cookie'),
    store: db.mySession
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // req.body

app.use(cookieParser()); //req.cookies

app.use(require('middleware/loadUser'));

app.use(require('middleware/sendHttpError'));

require('routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, req, res, next) {
    if(typeof err == 'number') {
        err = new HttpError(err);
    }
    if(err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'develop') {
            var errorHandler = errorHandler();
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
