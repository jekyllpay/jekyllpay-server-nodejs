'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jp_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        unique: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      //account unique id, varchar(36)
      auid: {
        unique: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      //payment unique id
      puid: {
        unique: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      //stripe, paypal, etc
      gateway: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // credit card, alipay, wechat pay, etc
      method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      transaction_id: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      min_unit: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'cent'
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'usd'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      memo: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jp_ayments');
  }
};