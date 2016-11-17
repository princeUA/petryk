var login = require('routes/login');
var db = require('db.js');

exports.get = function (req, res) {
db.connection.query("CREATE TABLE `petrykdb`.`users` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, `mail` VARCHAR(100) NOT NULL, `name` VARCHAR(100) NOT NULL, `password` VARCHAR(100) NOT NULL, `role` VARCHAR(45) NOT NULL DEFAULT 'user', PRIMARY KEY (`id`), UNIQUE INDEX `id_UNIQUE` (`id` ASC), UNIQUE INDEX `mail_UNIQUE` (`mail` ASC))");
    res.render('news');
};

exports.post = function(req, res, next) {
    login.login(req, res, next);

};
