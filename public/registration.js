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

// Obsolete function, I found out there is a .includes() in JavaScript so using that now instead
function matchFinder(arrayOfNames, newName){
    for (i = 0; i < arrayOfNames.length; i++){
        if (arrayOfNames[i] == newName){
            return true
        }
    } 
    return false
}

$('document').ready(function(){

    $('#usernameInput').on('blur', function(){
        console.log("username blur")
        let takenNames = ["arjun", "chris", "susan", "hudson", "nicholas", "sarah", "Arjun", "Chris", "Hudson", "Nicholas"];
        let username = $('#usernameInput').val();

        let nameIsTaken = takenNames.includes(username);

        if (username == '') {
            $("#usernameTaken").html("This field cannot be blank.");
            $("#usernameFree").html("");
            document.getElementById('usernameInput').setCustomValidity('Username cannot be blank.');
        }

        else if (nameIsTaken == true ) {
            $("#usernameTaken").html("Username is taken.");
            $("#usernameFree").html("");
            document.getElementById('usernameInput').setCustomValidity('Username is already taken. Please input another username.');


        }else if (nameIsTaken == false ) {
            $("#usernameTaken").html("");
            $("#usernameFree").html("Username is available.");
            document.getElementById('usernameInput').setCustomValidity('');

        }
    })
})


$('document').ready(function(){
    $.ajax('/getEmails')
    console.log("ajax")
    .done(function(data) {
        
        console.log(data);  

        $('#emailInput').on('blur', function(){
            console.log("email blur")
            let takenEmail = ["arjun@email.com", "cthompson98@bcit.ca", "hudson.mcmanus@gmail.com", "nlwilson35@gmail.com", "sarah.eslamdoust@gmail.com"];
            let email = $('#emailInput').val();

            let emailIsTaken = takenEmail.includes(email)

            if (email == '') {
                $("#emailTaken").html("This field cannot be blank");
                $("#emailFree").html("");
                document.getElementById('emailInput').setCustomValidity('Email entry cannot be blank.');
            }

            else if (emailIsTaken == true ) {
                $("#emailTaken").html("Email is taken.");
                $("#emailFree").html("");
                document.getElementById('emailInput').setCustomValidity('Email is already taken. Please input another email.');


            }else if (emailIsTaken == false ) {
                $("#emailTaken").html("");
                // $("#emailFree").html("Username is available.");
                document.getElementById('emailInput').setCustomValidity('');

            }
        })
    
    })
    .fail(function(error){
        console.log(error);
    })
})
