'use strict';

var express     = require('express');
var app         = express();
var http        = require('http').Server(app);
var io          = require('socket.io')(http);
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var db          = require('./config/db');

var port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.io = io;
  next();
});

/* Accessing the frontend routes */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

require('./app/routes/user.route')(app);
require('./app/routes/login.route')(app);
require('./app/routes/status.route')(app);

http.listen(port);

console.log('Notification System started! on port: '+ port);

exports = module.exports = app;