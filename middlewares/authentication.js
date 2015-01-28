module.exports = function(app) {

  var Authentication = function(request, response, next){
    console.log("Authenticating...")
    var loggedUser = request.session.loggedUser;
    if ( loggedUser ) {
      next();

    } else {
      response.redirect('/');

    }
  };

  app.use('/payment', Authentication);

  return Authentication;

};
