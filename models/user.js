"use strict";

module.exports = function(sequelize, DataTypes) {
  var User =  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,

  },{
    tableName: 'TBL_USERS',
    updatedAt: 'last_update',
    createdAt: 'creation_date',
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Payment, {as:'Payments'});
      }
    },
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  });

  return User;
}
