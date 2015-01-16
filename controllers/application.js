module.exports = function(app){
  var ApplicationController = {

    index: function(req, res) {
      res.render('index');
    },

    login: function(req, res) {
      var username = req.body.user.username;
      var password = req.body.user.password;
      if ( username && password ) {
        var user = req.body.user;
        user.payments = [];
        req.session.logged_user = user;
        res.redirect('/payment');
      } else {
        res.redirect('/');
      }
    },

    logout: function(req, res) {
      req.session.logged_user = null;
      res.redirect('/');
    }

  };
  return ApplicationController;
};
