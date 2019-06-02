'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        uuid: DataTypes.UUID,
        username:{
            type:DataTypes.STRING,
            validate:{
                len: [6,100],
                is: /^[A-Za-z]\w{0,}[A-Za-z0-9]$/
            }
        },
        email: {
            type:DataTypes.STRING,
            validate:{
                isEmail:true
            }
        },
        password: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        created_at: DataTypes.INTEGER(10).UNSIGNED,
        updated_at: DataTypes.INTEGER(10).UNSIGNED,
        deleted_at: DataTypes.INTEGER(10).UNSIGNED,
        backup_email: {
            type:DataTypes.STRING,
            validate:{
                isEmail:true
            }
        },
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
