
module.exports = function(app){

  var User = app.models.schema.User;

  var ApplicationController = {

    index: function(req, res) {
      res.render('index');
    },

    invalidUser: function(req, res) {
      res.render('index', {errorMessage:'Invalid user'});
    },

    login: function(req, res) {
      var username = req.body.user.username;
      var password = req.body.user.password;

      User.find({
        where: {username:username, password:password}

      }).then(function(user) {
        if ( user ) {
          req.session.loggedUser = user;
          res.redirect('/payment');

        } else {
          res.redirect('/invalidUser');

        }

      });
    },

    logout: function(req, res) {
      req.session.loggedUser = null;
      res.redirect('/');
    }

  };
  return ApplicationController;
};
