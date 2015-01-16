module.exports = function(app) {

  var PaymentService = {
    save: function(payment){

    },

    findIn: function(id, payments){
      for (var index in payments) {
        if (payments[index].id == id){
          return {payment:payments[index], index:index};
        }
      }
    }

  }

};
