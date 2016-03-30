var Express = require('express');
var Firebase = require('firebase');
var FirebaseTokenGenerator = require("firebase-token-generator");

// define web service
var app = Express();

// connect to database
var database = new Firebase(process.env.FIREBASE_URL);
var tokenGenerator = new FirebaseTokenGenerator(process.env.FIREBASE_SECRET);
var token = tokenGenerator.createToken({uid: "dr"});
database.authWithCustomToken(token, function (error) {
    if (error) {
        console.log("Firebase login failed\n", error);
    } else {
        console.log("Firebase login succeeded");
    }
});


/**
 define the api endpoints
 */

// subscribe the user
app.post('/api/alerts/subscribe/number/:number', function (request, response) {
    database.push(request.params.number);

    response.send("Subscribed " + request.params.number);
    console.log("Subscribed " + request.params.number);
});

// unsubscribe the user
app.post('/api/alerts/unsubscribe/number/:number', function (request, response) {
    response.send("Unsubscribed - " + request.params.number);
    console.log("Unsubscribed - " + request.params.number);
});

// process the data by sending it to users
app.get('/api/alerts/process/:data', function (req, res) {
    res.send("Here's the data to push to users - " + data);
});


/**
 start the server
 */

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port)
});