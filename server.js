const express = require("express");
const app = express();

app.use("/styles",  express.static(__dirname + '/frontend/styles'));
app.use("/scripts", express.static(__dirname + '/frontend/scripts'));
app.use("/images",  express.static(__dirname + '/frontend/images'));

app.get('/', function (req, res) {
    res.send("Selam");
    //res.sendFile(__dirname + '/public/' + "index" + ".html");
})

app.get('/styles', function (req, res) {
    res.send("Test");
    //res.sendFile(__dirname + '/public/' + "index" + ".html");
})


exports.getTest = functions.https.onRequest(app)

app.listen(3000);
