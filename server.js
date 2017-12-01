var express = require('express');
var app = express();
var fs = require("fs");
var parser = require("body-parser");
var path = require('path');

var userIdCtr = 0;
var workoutIdCtr = 0;
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
    		"weight" : 0,
    		"height" : 0,
    		"sex" : null,
    		"stats" : {
          "bench" : 0,
          "overheadpress" : 0,
          "deadlift" : 0,
          "squats" : 0
        },
    		"workouts" : {},
    		"weights" : {},
    		"caloricCount" : {
          "actual" : 0,
          "goal" : 0
        }
   		};

		newUser["name"] = req.body.name;
		newUser["weight"] = req.body.weight;
		newUser["height"] = req.body.height;
		newUser["sex"] = req.body.sex;

		users[userIdCtr] = newUser;

		console.log("New user created. User ID: " + 
		userIdCtr + "\n" + users[userIdCtr]);
  		userIdCtr++;
  	})
  	.get(function (req, res){
  		res.json(users);
  	})

app.route('/users/:userId')
	.get(function (req, res){
		if(users[req.params.userId] === 'undefined' || users[req.params.userId] === null){
			res.status(404).send("ERROR 404: ID not found");
			console.log("User with specified ID does not exist");
		}
		else{
			console.log("Now displaying user with ID: " + req.params.userId + "\n" +
			users[req.params.userId]);
			res.json(users[req.params.userId]);
		}
	})
	.delete(function (req, res){
		if(users[req.params.userId] == 'undefined' ||
			users[req.params.userId] == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else{
			delete users[req.params.userId];
			res.end( "Deleted user with ID: " + req.params.userId);
		}
	})

app.route('/users/:userId/workouts')
	.post(function (req, res){
		var newWorkout = {};

		newWorkout = req.body;

		users[req.params.userId].workouts[workoutIdCtr] = newWorkout;

		res.end();
		workoutIdCtr++;
	})
	.get(function (req, res){
		if(users[req.params.userId].workouts == 'undefined' || 
			users[req.params.userId].workouts == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else{
			res.json(users[req.params.userId].workouts);
			console.log(users[req.params.userId].workouts);
		}
	})
	.delete(function (req, res){
		users[req.params.userId].workouts = {};
		console.log(users[req.params.userId].workouts);
		res.end();
	})
  
app.route('/users/:userId/workouts/:workoutId')
	.get(function(req, res){
		if(users[req.params.userId].workouts[req.params.workoutId] == 'undefined' ||
			users[req.params.userId].workouts[req.params.workoutId] == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else
			res.json(users[req.params.userId].workouts[req.params.workoutId]);
	})
	.delete(function(req, res){
		if(users[req.params.userId].workouts[req.params.workoutId] == 'undefined' ||
			users[req.params.userId].workouts[req.params.workoutId] == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else
			delete users[req.params.userId].workouts[req.params.workoutId];
			res.end( "Deleted workout with ID: " + req.params.workoutId + 
				" for user with ID: " + req.params.userId);
	})

app.route('/users/:userId/workouts/:workoutId/:exerciseName')
	.post(function(req, res){
		var workout = users[req.params.userId].workouts[req.params.workoutId];

		if(users[req.params.userId].workouts[req.params.workoutId] == 'undefined' ||
			users[req.params.userId].workouts[req.params.workoutId] == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else{
			workout[req.params.exerciseName] = req.body;
			res.json(users[req.params.userId].workouts[req.params.workoutId]);
		}

	})
	.get(function(req, res){
		var workout = users[req.params.userId].workouts[req.params.workoutId];

		if(users[req.params.userId].workouts[req.params.workoutId] == 'undefined' ||
			users[req.params.userId].workouts[req.params.workoutId] == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else{
			res.json(workout[req.params.exerciseName]);
		}
	})
	.delete(function(req, res){
		var workout = users[req.params.userId].workouts[req.params.workoutId];

		if(users[req.params.userId].workouts[req.params.workoutId] == 'undefined' ||
			users[req.params.userId].workouts[req.params.workoutId] == null){
			res.status(404).send("ERROR 404: ID not found");
		}
		else{
			delete workout[req.params.exerciseName];
			res.end("Exercise " + req.params.exerciseName + " deleted!");
		}
	})


//-----------------------------------------------------------------------
var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("SWOLEMATE listening at http://%s:%s", host, port);

});