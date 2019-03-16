'use strict';

//public createTable(tableName: String, attributes: Object, options: Object, model: Model): Promise
const Sequelize = require('sequelize');
let attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  uuid: {
    unique: true,
    allowNull: false,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  primary_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  is_verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  deleted_at: {
    allowNull: true,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
};

let options = {
  timestamps: false,
  engine: 'InnoDB',    // default: 'InnoDB'
  charset: 'utf8mb4'   // default: null
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jp_users', attributes, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};