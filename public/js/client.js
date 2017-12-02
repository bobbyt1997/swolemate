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
})