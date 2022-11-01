const mysql = require("mysql");
const { DATABASE } = require("../../config/constants/app.constants");

const mysql_connection = mysql.createConnection({ ...DATABASE })

mysql_connection.connect(err => {
    if(err) {
        throw err;
    }
})

module.exports = mysql_connection;