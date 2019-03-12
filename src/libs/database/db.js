const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,//Using Sequelize without any aliases improves security. 
    define: {
        underscored: false,
        freezeTableName: true,
        charset: 'utf8mb4',
        dialectOptions: {
            collate: 'utf8_unicode_ci'
        },
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('DB Connection OK');
    })
    .catch(err => {
        console.error('DB Connection Error: ', err);
    });

module.exports = sequelize;