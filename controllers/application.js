module.exports = function(app){
  var ApplicationController = {

    index: function(req, res) {
      console.log('index');
      res.render('index');
    },

    login: function(req, res) {
      console.log('login');
      var email = req.body.user.email;
      var name = req.body.user.name;
      if ( email && name ) {
        var user = req.body.user;
        req.session.logged_user = user;
        res.redirect('/payment');
      } else {
        res.redirect('/');
      }
    },

    logout: function(req, res) {

    }

  };
  return ApplicationController;
};
