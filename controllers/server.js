var express = require('express');
var app = express();

/**
 define the routes
 */
app.post('/api/alerts/unsubscribe/number/:number', function (req, res) {
    res.send("Unsubscribed " + number);
    console.log("Unsubscribed " + number);
});

app.post('/api/alerts/subscribe/number/:number', function (req, res) {
    res.send("Subscribed " + number);
    console.log("Subscribed " + number);
});

app.get('/api/alerts/users', function (req, res) {
    res.send("Here's all the users");
});

/**
 start the server
 */
var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port)
});