var hapi = require('hapi');
var mysql = require('mysql');
var inert = require('inert');

// define the web service
var server = new hapi.Server();
server.connection({port: 8080});
server.register(inert, () => {});

// connect to database
var database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database.connect();

/**
 * host the front-end
 */
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log('Serving index.html');
        return reply.file('./../index.html');
    }
});

/**
 define the api endpoints
 */
server.route({
    method: 'POST',
    path: '/api/alerts/subscribe/number/{number}',
    handler: function (request, reply) {
        var number = request.params.number;
        var sql = 'insert into numbers (number) values ( ? );';
        sql = mysql.format(sql, number);

        runQuery(sql);
        reply('Subscribed number - ' + number);
    }
});

server.route({
    method: 'POST',
    path: '/api/alerts/unsubscribe/number/{number}',
    handler: function (request, reply) {
        var number = request.params.number;
        var sql = 'delete from numbers where number = ?';
        sql = mysql.format(sql, number);

        runQuery(sql);
        reply('Unsubscribed number - ' + number);
    }
});

server.route({
    method: 'GET',
    path: '/api/alerts/process/{data}',
    handler: function (request, reply) {
        retrieveNumbers(function (err, data) {
            if (err) {
                throw err;
            }

            data.forEach(function (row) {
                // send text to row.number
                console.log('Number - ' + row.number);
            });
        });

        reply('Subscribers have been alerted');
    }
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
 * start the server
 */
server.start(function () {
    console.log('Server running at:', server.info.uri);
});