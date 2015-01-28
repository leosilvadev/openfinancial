"use strict";

module.exports = function(sequelize, DataTypes) {
  var Payment =  sequelize.define("Payment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  },{
    tableName: 'TBL_PAYMENTS',
    updatedAt: 'last_update',
    createdAt: 'creation_date',
    classMethods: {
      associate: function(models) {
        Payment.belongsTo(models.User, {as:'Owner'});
      }
    },
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });

  return Payment;
}
