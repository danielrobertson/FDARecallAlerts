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

/**
 * Removes a number from the database 
 */ 
function removeNumber(number) {
    var sql = 'delete from numbers where number = ?';
    sql = mysql.format(sql, number);

    // TODO bubble errors up 
    executeQuery(sql);
}

/**
 * Adds a number to the database 
 */ 
function addNumber(number) {
    var sql = 'insert into numbers (number) values ( ? );';
    sql = mysql.format(sql, number);

    executeQuery(sql);
}

/**
 * Executes an insert statement 
 */
var executeQuery = function(sql) {
    database.query(sql, function (err) {
        if (err) {
            throw err;
        }
    });
};


exports.retrieveAllNumbers = retrieveAllNumbers; 
exports.removeNumber = removeNumber; 
exports.addNumber = addNumber; 

