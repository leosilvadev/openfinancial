module.exports = function(app){
  var payment = app.controllers.payment;
  app.get('/payment', payment.index);
  app.get('/payment/:id', payment.select);
  app.post('/payment', payment.create);
  app.put('/payment', payment.update);
  app.delete('/payment/:id', payment.delete);
};
