"use strict";

module.exports = function(sequelize, DataTypes) {
  var Payment =  sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,

  },{
    tableName: 'TBL_USERS',
    updatedAt: 'last_update',
    createdAt: 'creation_date'
  });

  return Payment;
}
