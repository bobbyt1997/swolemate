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
        console.log(user);

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
    $("#makeWorkouts").on('click', function () {
      var workout = {};
      
      workout.newWorkout = $("#input-newWorkout").val();
      
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
    $("#calories").on('click', function () {
        var calories = {};

        calories.actual= $("#input-actual").val();
        calories.goal = $("#input-goal").val();

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
    $("#weight").on('click', function () {
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
    $("#getSwole").on('click', function () {
        var stats = {};
        
        stats.bench = $("#input-bench").val();
        stats.overheadpress = $("#input-overheadpress").val();
        stats.deadlift = $("#input-deadlift").val();
        stats.squats = $("#input-squats").val();
        
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