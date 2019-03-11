'use strict';


const UserModel = sequelize.define('users', {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    uid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
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
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
    },
    paranoid: true
})

module.exports = UserModel;