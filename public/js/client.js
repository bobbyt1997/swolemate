$(document).ready(function () {
    // Sign up button
    $("#getSwole").on('click', function () {
        var user = {};
        user.name = $("#input-name").val();
        user.weight = $("#input-weight").val();
        user.height = $("#input-height").val();
        if (document.getElementById('male').checked) {
            user.sex = "male";
        } else {
            user.sex = "female";
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/users',
            data: user,
            success: function (res) {
                console.log('success');
                window.location.assign('/app');
                app(res);
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
    
    // Make Workouts
    $("#create-workout-btn").on('click', function () {
      var workout = {};
      
      workout.workoutDay = $("#exercise-workout").val();
      workout.workoutName = $("#exercise-name").val();
      workout.workoutSets = $("#exercise-s").val();
      workout.workoutReps = $("#exercise-r").val();
      
      $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/users/0/workouts/',
          data: workout,
          success: function (res) {
              console.log('success');
              var $newWorkout = $("<h1>").text(res.day);
              var $newName = $("<p>").text("Workout: " + res.name);
              var $newSets = $("<p>").text("Sets: " + res.sets);
              var $newReps = $("<p>").text("Reps: " + res.reps);
              $("#workouts").append($newWorkout);
              $("#workouts").append($newName);
              $("#workouts").append($newSets);
              $("#workouts").append($newReps);
          },
          error: function(res) {
              console.log('failure');
          }
      });
    });
    
    // Enter Calories & Calories Counter
    $("#calculate-calories-btn").on('click', function () {
        var calories = {};

        calories.actual= $("#input-actual").val();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/users/0/caloricCount/',
            data: calories,
            success: function (res) {
                console.log('success');
                document.getElementById("howmuch").innerHTML = res.actual;
                document.getElementById("goals").innerHTML = Math.round(res.goal);
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
    
    // Weight Tracker
    $("#weight-btn").on('click', function () {
        var bodyWeight = {};
        
        bodyWeight.date = $("#input-date").val();
        bodyWeight.weight = $("#set-weight").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/users/0/weights/',
            data: bodyWeight,
            success: function (res) {
                console.log('success');
                var $log = $("<p>").text("Date: " + res.date + "  Weight: " + res.weight);
                $("#todays-weight").append($log);
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
    
    // Stats for weights
    $("#update-stats-btn").on('click', function () {
        var stats = {};
        
        stats.bench = $("#bench-stat-input").val();
        stats.overheadpress = $("#ohp-stat-input").val();
        stats.deadlift = $("#deadlift-stat-input").val();
        stats.squats = $("#squat-stat-input").val();
        
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/users/0/stats',
            data: stats,
            success: function (res) {
                console.log('success');
                document.getElementById("stats-bench").innerHTML = res.bench;
                document.getElementById("stats-ohp").innerHTML = res.overheadpress;
                document.getElementById("stats-deadlift").innerHTML = res.deadlift;
                document.getElementById("stats-squats").innerHTML = res.squats;
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
})