var HttpError = require("error").HttpError;
module.exports = function(app) {

  app.get('/', require('./main').get);
  app.post('/', require('./main').post);

  app.get('/editmain', require('./editmain').get);
  app.post('/editmain', require('./editmain').post);

  app.get('/news', require('./news').get);
  app.post('/news', require('./news').post);

  
  app.get('/news/:id', require('./new').get);
  app.post('/news/:id', require('./new').post);

  app.get('/news/:id/edit', require('./edit').get);
  app.post('/news/:id/edit', require('./edit').post);

  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);

  app.get('/add', require('./add').get);
  app.post('/add', require('./add').post);

  app.get('/users', require('./users').get);
  app.post('/users', require('./users').post);

  app.get('/users/:id', require('./user').get);
  app.post('/users/:id', require('./user').post);

  app.get('/photos', require('./photos').get);
  app.post('/photos', require('./photos').post);

  app.get('/photos/:id', require('./photo').get);
  app.post('/photos/:id', require('./photo').post);
  
  app.post('/login', require('./login').post);

  app.get('/:id', function(req, res, next){
        next(new HttpError(404, "Такої сторінки не існує"));
  });
};