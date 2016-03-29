var express = require('express');
var app = express();

/**
 define the api endpoints
 */
app.post('/api/alerts/unsubscribe/number/:number', function (request, response) {
    res.send("Unsubscribed " + request.params.number);
    console.log("Unsubscribed " + request.params.number);
});

app.post('/api/alerts/subscribe/number/:number', function (request, response) {
    res.send("Subscribed " + request.params.number);
    console.log("Subscribed " + request.params.number);
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