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