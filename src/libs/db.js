const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.db_port,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8mb4",
    debug: process.env.NODE_ENV === 'development'
});

dbConn.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + dbConn.threadId + ' charsetNumber:' + dbConn.config.charsetNumber);
});

module.exports = dbConn;