var Express = require('express');
var mysql = require('mysql');

// define web service
var app = Express();

// connect to database
var database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database.connect();

/**
 define the api endpoints
 */

// subscribe the user
app.post('/api/alerts/subscribe/number/:number', function (request, response) {
    var number = request.params.number;
    var sql = 'insert into numbers (number) values ( ? );';
    sql = mysql.format(sql, number);

    runQuery(sql);
    response.send('Subscribed number - ' + number);
});

// unsubscribe the user
app.post('/api/alerts/unsubscribe/number/:number', function (request, response) {
    var number = request.params.number;
    var sql = 'delete from numbers where number = ?';
    sql = mysql.format(sql, number);

    runQuery(sql);
    response.send('Unsubscribed number - ' + number);
});

// process the data by sending it to users
app.get('/api/alerts/process/:data', function (request, response) {
    retrieveNumbers(function (err, data) {
        if (err) {
            throw err;
        }

        data.forEach(function (row) {
            // send text to row.number
            console.log('Number - ' + row.number);
        });
    });

    response.send('Subscribers have been alerted');
});

/**
 * helper functions
 */

var runQuery = function (sql) {
    database.query(sql, function (err) {
        if (err) {
            throw err;
        }
    });
};

var retrieveNumbers = function (callback) {
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
 start the server
 */

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port)
});
