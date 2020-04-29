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


// CHECK IF USERNAME, EMAIL TAKEN ALREADY IN THE DATABASE //
$('document').ready(function(){
    let username_state = false;
    let email_state = false;

    $('#username').on('blur', function(){
        let username = $('#username').val();
        if (username == '') {
            username_state = false;
            return;
        }
        $.ajax({
            url: 'register.php',
            type: 'post',
            data: {
                'username_check' : 1,
                'username' : username,
            },
            success: function(response){
                if (response == 'taken' ) {
                    username_state = false;
                    $('#username').parent().removeClass();
                    $('#username').parent().addClass("form_error");
                    $('#username').siblings("span").text('Sorry... Username already taken');

                }else if (response == 'not_taken') {
                    username_state = true;
                    $('#username').parent().removeClass();
                    $('#username').parent().addClass("form_success");
                    $('#username').siblings("span").text('Username available');
                }
            }
        });
    });

    $('#email').on('blur', function(){
        let email = $('#email').val();

        if (email == '') {
            email_state = false;
            return;
        }
        $.ajax({
            url: 'register.php',
            type: 'post',
            data: {
                'email_check' : 1,
                'email' : email,
            },
            success: function(response){
                if (response == 'taken' ) {
                    email_state = false;
                    $('#email').parent().removeClass();
                    $('#email').parent().addClass("form_error");
                    $('#email').siblings("span").text('Sorry... Email already taken');
                }else if (response == 'not_taken') {
                    email_state = true;
                    $('#email').parent().removeClass();
                    $('#email').parent().addClass("form_success");
                    $('#email').siblings("span").text('Email available');
                }
            }
        });
    });
   
    $('#reg_btn').on('click', function(){
        let username = $('#username').val();
        let email = $('#email').val();
        let password = $('#password').val();
        if (username_state == false || email_state == false) {
            $('#error_msg').text('Fix the errors in the form first');

        }else{
         // proceed with form submission
            $.ajax({
                url: 'register.php',
                type: 'post',
                data: {
                    'save' : 1,
                    'email' : email,
                    'username' : username,
                    'password' : password,
                },
                success: function(response){
                    alert('user saved');
                    $('#username').val('');
                    $('#email').val('');
                    $('#password').val('');
                }
            });
        }
    });
});