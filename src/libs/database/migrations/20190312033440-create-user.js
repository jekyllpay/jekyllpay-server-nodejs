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
  password: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  is_verified: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  backup_email: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  cellphone: {
    type: Sequelize.STRING,
    defaultValue: null
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
    return queryInterface.dropTable('jp_users');
  }
};