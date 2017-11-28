var express = require('express');
var app = express();
var fs = require("fs");
var parser = require("body-parser");
var path = require('path');

var idCounter = 0;
var reminderIDCounter = 0;
var users = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());
app.use(parser.urlencoded({ 
   extended: true 
}));