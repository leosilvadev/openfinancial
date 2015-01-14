module.exports = function(app){
  var UserController = {

    home: function(req, res){
      res.render('user/home');
    }

  }

  return UserController;
};
