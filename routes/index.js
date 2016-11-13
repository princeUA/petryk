module.exports = function(app) {

  app.get('/', require('./main').get);
  app.post('/', require('./main').post);

  app.get('/news', require('./news').get);
  app.post('/news', require('./news').post);

  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);
  
};