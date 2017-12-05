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
            dataType: 'application/json',
            data: user,
            dataType: "json",
            success: function (res) {
                console.log('success');
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
    
    // Make Workouts
    $("#makeWorkouts").on('click', function () {
        
    });
    
    // Enter Calories & Calories Counter
    $("#calories").on('click', function () {
        var calories = {};

        calories.actual= $("#input-actual").val();
        calories.goal = $("#input-goal").val();

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/users/:userId/caloricCount/',
            dataType: 'application/json',
            data: calories,
            dataType: "json",
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
            url: 'http://localhost:8080/users/:userId/weights/',
            dataType: 'application/json',
            data: bodyWeight,
            dataType: "json",
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
            url: 'http://localhost:8080/users/:userId/stats/',
            dataType: 'application/json',
            data: stats,
            dataType: "json",
            success: function (res) {
                console.log('success');
            },
            error: function(res) {
                console.log('failure');
            }
        });
    });
})