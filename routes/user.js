module.exports = function(app) {
  var user = app.controllers.user;
  app.get('/home', user.home);
};
