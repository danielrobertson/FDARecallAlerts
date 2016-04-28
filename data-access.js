var mysql = require('mysql');

// connect to database
var database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database.connect();

/**
 * Retrieves and returns all numbers from the database 
 */ 
function retrieveAllNumbers(callback) {
    var sql = 'select number from numbers';
    database.query(sql, function (err, data) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, data);
        }
    });
};

exports.retrieveAllNumbers = retrieveAllNumbers; 