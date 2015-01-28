
module.exports = function(app){

  var Payment = app.models.schema.Payment;

  var PaymentController = {

    index: function(req, res) {
      var loggedUser = req.session.loggedUser;
      Payment.findAll({
        where:{
          user_id: loggedUser.id
        }
      })
        .success(function(payments) {
          res.render('payment/index', {payments:payments});
      });
    },

    edit: function(req, res) {
      var id = req.params.id;
      var loggedUser = req.session.loggedUser;
      var payment = PaymentService.findIn(id, loggedUser.payments).payment;
      if ( payment ) {
        res.status(200).send(payment);
      } else {
        res.status(400).send({message:'Not found'});
      }
    },

    create: function(req, res) {
      var loggedUser = req.session.loggedUser;
      var payment = req.body.payment;
      if ( payment.id ) {
        var id = payment.id;
        var paymentFound = PaymentService.findIn(id, loggedUser.payments).payment;
        paymentFound.description = payment.description;
        paymentFound.price = payment.price;
        paymentFound.date = payment.date;
      } else {
        Payment.create({
          description:payment.description,
          price:payment.price,
          user_id:loggedUser.id
        }).complete(function(err){
          if(!!err){
            res.redirect('/payment');
          }else{
            res.redirect('/payment');
          }
        });
      }
    },

    update: function(req, res) {

    },

    delete: function(req, res) {
      var loggedUser = req.session.loggedUser;
      var response = Payment.destroy({
        where:{
          id: req.params.id,
          user_id: loggedUser.id
        }
      }).complete(function(err){
        res.redirect('/payment');
      });
    }

  };
  return PaymentController;
};
