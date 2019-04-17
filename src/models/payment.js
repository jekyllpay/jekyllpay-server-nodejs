'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    uuid: DataTypes.UUID,
    auid: DataTypes.UUID,
    puid: DataTypes.UUID,
    gateway: DataTypes.STRING,
    method: DataTypes.STRING,
    transaction_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    min_unit: DataTypes.STRING,
    currency: DataTypes.STRING,
    status: DataTypes.STRING,
    memo: DataTypes.STRING,
    created_at: DataTypes.INTEGER(10).UNSIGNED
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