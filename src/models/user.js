'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        uuid: DataTypes.UUID,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        created_at: DataTypes.INTEGER(10).UNSIGNED,
        updated_at: DataTypes.INTEGER(10).UNSIGNED,
        deleted_at: DataTypes.INTEGER(10).UNSIGNED,
        backup_email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        cell_phone: DataTypes.STRING
    }, {
            tableName: "jp_users",
            classMethods: {
                associate: function (models) {
                    User.hasMany(models.Account, {
                        constraints: false
                    });
                    User.hasMany(models.Payment, {
                        constraints: false
                    });
                }
            }
        });

    return User;
};
