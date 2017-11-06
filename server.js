const express = require('express');
const app = express()
const bodypareser = require('body-parser');
const json = bodypareser.json;
const http = require('http').Server(app)
const urlencoded = bodypareser.urlencoded;
const path = require('path')

app.use(json());

app.use(urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/'));

app.all('/*', function(req, res) {
    res.sendfile('index.html');
});

var port = (process.env.PORT || 3000);
app.listen(port, function(){
	console.log("App is running on port 3000")
})