module.exports = function(app) {
  var application = app.controllers.application;
  app.get('/', application.index);
  app.get('/invalidUser', application.invalidUser);
  app.post('/login', application.login);
  app.get('/logout', application.logout);
};
