'use strict';
module.exports = (sequelize, DataTypes) => {
  let Account = sequelize.define('Account', {
    uuid: DataTypes.UUID,
    auid: DataTypes.UUID,
    gateway: DataTypes.STRING,
    account_id: DataTypes.STRING,
    account_email: {
      type: DataTypes.STRING,
      validate:{
        isEmail: true
      }
    },
    created_at: DataTypes.INTEGER(10).UNSIGNED,
    updated_at: DataTypes.INTEGER(10).UNSIGNED,
    deleted_at: DataTypes.INTEGER(10).UNSIGNED
  }, {
      tableName: "jp_accounts",
    });

  Account.associate = function (models) {
    Account.belongsTo(models.User, {
      foreignKey: "uuid"
    });
    Account.hasMany(models.Payment, {
      constraints: false
    });
  };
  return Account;
};