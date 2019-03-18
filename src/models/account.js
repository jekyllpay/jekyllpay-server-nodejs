'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    gateway: DataTypes.STRING
  }, {
    underscored: true,
  });
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};