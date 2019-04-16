'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    puid: DataTypes.STRING
  }, {
      tableName: "jp_payments",
    });
  Payment.associate = function (models) {
    Payment.belongsTo(models.Account, {
      foreignKey: "auid"
    });
  };
  return Payment;
};