'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jp_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // user uuid
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
      //stripe, paypal, etc
      gateway: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      account_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: null
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: null
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.INTEGER(10).UNSIGNED,
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jp_accounts');
  }
};