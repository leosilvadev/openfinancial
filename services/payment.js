var models  = require('../models');

module.exports = function(app) {

  var Payment = models.Payment;

  var PaymentService = {
    save: function(payment){
      Payment.build({
        description: payment.description,
        price: payment.price
      })
      .save()
      .complete(function(err) {
        if (!!err) {
          console.log('The instance has not been saved:', err)
        } else {
          console.log('We have a persisted instance now')
        }
      });
    },

    findIn: function(id, payments){
      for (var index in payments) {
        if (payments[index].id == id){
          return {payment:payments[index], index:index};
        }
      }
    }

  };

  return PaymentService;

};
