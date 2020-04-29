// Dynamically inform users if the passwords they are entering into password fields match
function checkPasswordMatch() {
    let password = $("#passwordInput").val();
    let confirmPassword = $("#passwordConfirm").val();

    if (password != confirmPassword){
        $("#divCheckPasswordMatch").html("Passwords do not match!");
        $("#divCheckPasswordMatchTrue").html("");
    }
    else{
        $("#divCheckPasswordMatch").html("");
        $("#divCheckPasswordMatchTrue").html("Passwords match.");
    }
}

// If the passwords do not match, prevent form submission
function checkPasswordIsValid(input) {
    if (input.value != document.getElementById('passwordInput').value) {
        input.setCustomValidity('Passwords Must be Matching.');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}

// This password check is used to prevent the user from submitting the form after matching the second password input to the first
// And then going back and changing the first password (This is a bug patch)
function finalPasswordCheck() {
    if (document.getElementById('passwordInput').value != document.getElementById('passwordConfirm').value) {
        document.getElementById('passwordInput').setCustomValidity('Passwords Must be Matching.');
    } else {
        // input is valid -- reset the error message
        document.getElementById('passwordInput').setCustomValidity('');
    }
}


// This is a function to be put in the form as a last line of defence against inaccurate passwords (probably obsolete now, leaving it in for now)
function verifyPasswordsMatch(){
    let password = document.getElementById("passwordInput").value;
    let confirmPassword = document.getElementById("passwordConfirm").value;
    if (password != confirmPassword){
        alert("The passwords no not seem to match, please try again.");
        password = "";
        confirmPassword = "";
        return false
        
    }else{
        return true
    }
}


// CHECK IF USERNAME, EMAIL TAKEN ALREADY IN THE DATABASE // only for customer_registration right now... doenst work cuz dont have database yet
$('document').ready(function(){
    let username_state = false;
    let email_state = false;

    $('#usernameInput').on('blur', function(){
        console.log("username blur")
        let username = $('#usernameInput').val();
        if (username == '') {
            username_state = false;
            return;
        }

        $.ajax({
            url: 'customer_registration.html',
            type: 'post',
            data: {
                'username_check' : 1,
                'username' : username,
            },
            success: function(response){
                if (response == 'taken' ) {
                    username_state = false;
                    $("#usernameTaken").html("Username is taken.");
                    $("#usernameFree").html("");

                }else if (response == 'not_taken') {
                    username_state = true;
                    $("#usernameTaken").html("");
                    $("#usernameFree").html("Username is available.");
                }
            }
        });
    });

    $('#emailInput').on('blur', function(){
        let email = $('#emailInput').val();

        if (email == '') {
            email_state = false;
            return;
        }
        $.ajax({
            url: 'customer_registration.html',
            type: 'post',
            data: {
                'email_check' : 1,
                'email' : email,
            },
            success: function(response){
                if (response == 'taken' ) {
                    email_state = false;
                    $("#emailTaken").html("That email is already registered to an account.");
                }else if (response == 'not_taken') {
                    email_state = true;
                    $("#emailTaken").html("");
                }
            }
        });
    });
   
    $('#submitBtn').on('click', function(){
        let username = $('#usernameInput').val();
        let email = $('#emailInput').val();
        let password = $('#passwordInput').val();
        if (username_state == false || email_state == false) {
            $('#error_msg').text('Please complete the forum');

        }else{
         // proceed with form submission
            $.ajax({
                url: 'customer_registration.html',
                type: 'post',
                data: {
                    'save' : 1,
                    'email' : email,
                    'username' : username,
                    'password' : password,
                },
                success: function(response){
                    alert('user saved');
                    $('#usernameInput').val('');
                    $('#emailInput').val('');
                    $('#passwordInput').val('');
                }
            });
        }
    });
});