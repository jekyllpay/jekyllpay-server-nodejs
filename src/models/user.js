'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('jp_users', {
        username: DataTypes.STRING
    });

    return User;
};