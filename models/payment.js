"use strict";

module.exports = function(sequelize, DataTypes) {
  var Payment =  sequelize.define("Payment", {
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  },{
    tableName: 'TBL_PAYMENTS',
    updatedAt: 'last_update',
    createdAt: 'creation_date'
  });

  return Payment;
}
