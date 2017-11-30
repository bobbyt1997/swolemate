var express = require('express');
var app = express();
var fs = require("fs");
var parser = require("body-parser");
var path = require('path');

var userIdCtr = 0;
var users = {};

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());
app.use(parser.urlencoded({ 
   extended: true 
}));




//-----------------------------------------------------------------------
var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("REMINDER APP listening at http://%s:%s", host, port);

});