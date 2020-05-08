let geocoder;
geocoder = new google.maps.Geocoder();

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
// function matchFinder(arrayOfNames, newName){
//     for (i = 0; i < arrayOfNames.length; i++){
//         if (arrayOfNames[i] == newName){
//             return true
//         }
//     } 
//     return false
// }

// $('document').ready(function(){

//     $('#usernameInput').on('blur', function(){
//         console.log("username blur")
//         let takenNames = ["arjun", "chris", "susan", "hudson", "nicholas", "sarah", "Arjun", "Chris", "Hudson", "Nicholas"];
//         let username = $('#usernameInput').val();

//         let nameIsTaken = takenNames.includes(username);

//         if (username == '') {
//             $("#usernameTaken").html("This field cannot be blank.");
//             $("#usernameFree").html("");
//             document.getElementById('usernameInput').setCustomValidity('Username cannot be blank.');
//         }

//         else if (nameIsTaken == true ) {
//             $("#usernameTaken").html("Username is taken.");
//             $("#usernameFree").html("");
//             document.getElementById('usernameInput').setCustomValidity('Username is already taken. Please input another username.');


//         }else if (nameIsTaken == false ) {
//             $("#usernameTaken").html("");
//             $("#usernameFree").html("Username is available.");
//             document.getElementById('usernameInput').setCustomValidity('');

//         }
//     })
// })


$('document').ready(function(){
    $.ajax('/getEmails')
    .done(function(data) {
        console.log(data[0].email);  
        let takenEmail = [];
        for (i = 0; i < data.length; i++){
            takenEmail.push(data[i].email)
        }

        $('#emailInput').on('blur', function(){
            console.log("email blur")
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
                // $("#emailFree").html("Email is available.");
                document.getElementById('emailInput').setCustomValidity('');

            }
        })
        $('#inputAddress').on('blur', function(){
            console.log("address blur");
            let location = $('#inputAddress').val();
            codeAddress(location);
        })
    
    })
    .fail(function(error){
        console.log(error);
    })
})

function codeAddress(address) {
    console.log("STARTING FUNCTION");
    geocoder.geocode({ 'address': address, 'componentRestrictions':{'country':'CA'}}, function (results, status) {
        if (status == 'OK') {
            console.log("STATUS OK");
            let lat = results[0].geometry.location.lat()
            let lng = results[0].geometry.location.lng()
            console.log(lat)
            console.log(lng)
            let latInput = $("#lat").val(lat);
            let lngInput = $("#long").val(lng);
            latInput= lat;
            lngInput = lng;
            console.log(document.getElementById("long").value)
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
  }