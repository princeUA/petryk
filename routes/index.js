module.exports = function(app) {

  app.get('/', require('./main').get);
  app.post('/', require('./main').post);

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
  
  app.post('/login', require('./login').post);
  
};