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
    		"weights" : [],
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
  		
    res.json(users[userIdCtr]);
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

		res.status(200).send();
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
  
app.route('/users/:userId/caloricCount/')
  .get(function ((req, res) {
    var id = req.params.userId;
    if(!users[id]) {
			res.status(404).send("ERROR 404: ID not found");
		}
		else { 
      res.header("Content-Type", "application/json");
      res.status(200);
      res.json(users[id].caloricCount);
    }
  })
  .put(function (req, res) {
    var id = req.params.userId;
    if(!users[id]) {
			res.status(404).send("ERROR 404: ID not found");
		}
		else {
      res.header("Content-Type", "application/json");
      res.status(200);
      
      var cals = req.body.actual;
      var actualCals = cals + users[id].caloricCount.actual;
      
      var weight = users[id].weight * 0.453592;
      var height = users[id].height * 2.54;
      if(users[id].sex === "male") {
        var goalCals = 66.4730 + (13.7516 * weight) + (5.0033 * height);
      }
      else {
        var goalCals = 655.0955 + (9.5634 * weight) + (1.8496 * height);
      }
      
      users[id].caloricCount.actual = actualCals;
      users[id].caloricCount.goal = goalCals;
      res.json(users[id].caloricCount);
    }
  })

app.route('/users/:userId/weights/')
  .get(function ((req, res) {
    var id = req.params.userId;
    if(!users[id]) {
			res.status(404).send("ERROR 404: ID not found");
		}
		else { 
      res.header("Content-Type", "application/json");
      res.status(200);
      res.json(users[id].weights);
    }
  })
  .post(function (req, res) {
    var id = req.params.userId;
    if(!users[id]) {
			res.status(404).send("ERROR 404: ID not found");
		}
		else {
      res.header("Content-Type", "application/json");
      res.status(200);
      
      var date = req.body.date;
      var weight = req.body.weight;
      users[id].weights.push({date, weight});
      res.json(users[id].weights);
    }
  })

app.route('/users/:userId/stats/')
  .get(function ((req, res) {
    var id = req.params.userId;
    if(!users[id]) {
			res.status(404).send("ERROR 404: ID not found");
		}
		else { 
      res.header("Content-Type", "application/json");
      res.status(200);
      res.json(users[id].stats);
    }
  })
  .put(function (req, res) {
    var id = req.params.userId;
    if(!users[id]) {
			res.status(404).send("ERROR 404: ID not found");
		}
		else {
      res.header("Content-Type", "application/json");
      res.status(200);
      
      var bench = req.body.bench;
      var overheadpress = req.body.overheadpress;
      var deadlift = req.body.deadlift;
      var squats = req.body.squats;
      
      users[id].stats.bench = bench;
      users[id].stats.overheadpress = overheadpress;
      users[id].stats.deadlift = deadlift;
      users[id].stats.squats = squats;
      res.json(users[id].stats);
    }
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

module.exports = app;