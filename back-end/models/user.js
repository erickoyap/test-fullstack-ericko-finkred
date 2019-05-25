'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    customId: DataTypes.STRING,
    userName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    identityNumber: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};