var passwordHash = require('password-hash');
var db = require('db.js');
var util = require('util');

exports.reg = function(mail, name, password, login, img, callback) {
    db.connection.query('SELECT * FROM users WHERE mail = ?', mail, function(err, result) {
        if(err) callback(new AuthError(err));
        else if(result[0]!== undefined) {
            callback(new AuthError("Ця пошта вже використовується"));
        }
        else {
            var hashedPass = passwordHash.generate(password);
            db.connection.query('INSERT INTO users (mail, name, password, login, image) VALUES(?, ?, ?, ?, ?)', [mail, name, hashedPass, login, img], function(err) {
                if (err) {
                    callback(new AuthError(err));
                }
                callback(null);
            });
        }
    });


};

exports.check = function(mail, password, callback) {

    db.connection.query('SELECT * FROM users WHERE mail = ?', [mail], function(err, user){
        if(err) {
            callback(err);
        }
        if(user[0]) {
            if(passwordHash.verify(password, user[0].password)) {
                callback(null, user);
            } else {
                callback("errLogin");
            }
        } else {
            callback("errLogin");
        }
    });
};


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;

