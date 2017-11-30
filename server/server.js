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

app.route('/users')
	.post(function (req, res) {
  		var newUser = {
    		"name" : "",
    		"weight" : null,
    		"height" : null,
    		"sex" : null,
    		"stats" : {},
    		"workouts" : {},
    		"weights" : {},
    		"caloricCount" : {}
   		};

		newUser["name"] = req.body.name;
		newUser["weight"] = req.body.weight;
		newUser["height"] = req.body.height;
		newUser["sex"] = req.body.sex;

		users[userIdCtr] = newUser;
  
		console.log( "New user created. User ID: " + 
		userIdCtr );

		console.log(users);
  
		res.end( JSON.stringify() );

		if (res.statusCode = 200){
 			console.log("200 OK");
  		}
  		else
    		console.log("404 NOT FOUND");
  		
  		userIdCtr++;
  	})


//-----------------------------------------------------------------------
var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("REMINDER APP listening at http://%s:%s", host, port);

});