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
      
      workout.workoutName = $("#exercise-1").val();
      workout.workoutSets = $("#exercise-1-s").val();
      workout.workoutReps = $("#exercise-1-r").val();
      
      $.ajax({
          type: 'POST',
          url: 'http://localhost:8080/users/0/workouts/',
          data: workout,
          success: function (res) {
              console.log('success');
          },
          error: function(res) {
              console.log('failure');
          }
      });
    });
    
    // Enter Calories & Calories Counter
    $("#calculate-calories-btn"").on('click', function () {
        var calories = {};

        calories.actual= $("#input-actual").val();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/users/0/caloricCount/',
            data: calories,
            success: function (res) {
                console.log('success');
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
        bodyWeight.weight = $("#input-weight").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/users/0/weights/',
            data: bodyWeight,
            success: function (res) {
                console.log('success');
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
            url: 'http://localhost:8080/users/0/stats/',
            data: stats,
            success: function (res) {
                console.log('success');
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
})