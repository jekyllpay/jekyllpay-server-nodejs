'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        uuid: DataTypes.UUID,
        username: DataTypes.STRING,
        primary_email: DataTypes.STRING,
        password: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        created_at: DataTypes.INTEGER(10).UNSIGNED,
        updated_at: DataTypes.INTEGER(10).UNSIGNED
    }, {
            tableName: "jp_users"
        });

    return User;
};
