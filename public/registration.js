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

// Populates time inputs
$(".time-input").append(`<option selected disabled>---</option>`);
$(".time-input").append(`<option>12:00 AM</option>`);
$(".time-input").append(`<option>12:30 AM</option>`);
for(let i = 1; i <= 11; i++) {
    $(".time-input").append(`<option>${i}:00 AM</option>`);
    $(".time-input").append(`<option>${i}:30 AM</option>`);
}
$(".time-input").append(`<option>12:00 PM</option>`);
$(".time-input").append(`<option>12:30 PM</option>`);
for(let i = 1; i <= 11; i++) {
    $(".time-input").append(`<option>${i}:00 PM</option>`);
    $(".time-input").append(`<option>${i}:30 PM</option>`);
};

// Controls hours of operation input
$("#monCheckClosed").on("change", () => {
    if ($("#monCheckClosed")[0].checked) {
        $("#monCheck24").prop("disabled", true);
        $("#monOpen").prop("disabled", true);
        $("#monClose").prop("disabled", true);
    } else {
        $("#monCheck24").prop("disabled", false);
        $("#monOpen").prop("disabled", false);
        $("#monClose").prop("disabled", false);
    }
});
$("#monCheck24").on("change", () => {
    if ($("#monCheck24")[0].checked) {
        $("#monCheckClosed").prop("disabled", true);
        $("#monOpen").prop("disabled", true);
        $("#monClose").prop("disabled", true);
    } else {
        $("#monCheckClosed").prop("disabled", false);
        $("#monOpen").prop("disabled", false);
        $("#monClose").prop("disabled", false);
    }
});
$("#tueCheckClosed").on("change", () => {
    if ($("#tueCheckClosed")[0].checked) {
        $("#tueCheck24").prop("disabled", true);
        $("#tueOpen").prop("disabled", true);
        $("#tueClose").prop("disabled", true);
    } else {
        $("#tueCheck24").prop("disabled", false);
        $("#tueOpen").prop("disabled", false);
        $("#tueClose").prop("disabled", false);
    }
});
$("#tueCheck24").on("change", () => {
    if ($("#tueCheck24")[0].checked) {
        $("#tueCheckClosed").prop("disabled", true);
        $("#tueOpen").prop("disabled", true);
        $("#tueClose").prop("disabled", true);
    } else {
        $("#tueCheckClosed").prop("disabled", false);
        $("#tueOpen").prop("disabled", false);
        $("#tueClose").prop("disabled", false);
    }
});
$("#wedCheckClosed").on("change", () => {
    if ($("#wedCheckClosed")[0].checked) {
        $("#wedCheck24").prop("disabled", true);
        $("#wedOpen").prop("disabled", true);
        $("#wedClose").prop("disabled", true);
    } else {
        $("#wedCheck24").prop("disabled", false);
        $("#wedOpen").prop("disabled", false);
        $("#wedClose").prop("disabled", false);
    }
});
$("#wedCheck24").on("change", () => {
    if ($("#wedCheck24")[0].checked) {
        $("#wedCheckClosed").prop("disabled", true);
        $("#wedOpen").prop("disabled", true);
        $("#wedClose").prop("disabled", true);
    } else {
        $("#wedCheckClosed").prop("disabled", false);
        $("#wedOpen").prop("disabled", false);
        $("#wedClose").prop("disabled", false);
    }
});
$("#thuCheckClosed").on("change", () => {
    if ($("#thuCheckClosed")[0].checked) {
        $("#thuCheck24").prop("disabled", true);
        $("#thuOpen").prop("disabled", true);
        $("#thuClose").prop("disabled", true);
    } else {
        $("#thuCheck24").prop("disabled", false);
        $("#thuOpen").prop("disabled", false);
        $("#thuClose").prop("disabled", false);
    }
});
$("#thuCheck24").on("change", () => {
    if ($("#thuCheck24")[0].checked) {
        $("#thuCheckClosed").prop("disabled", true);
        $("#thuOpen").prop("disabled", true);
        $("#thuClose").prop("disabled", true);
    } else {
        $("#thuCheckClosed").prop("disabled", false);
        $("#thuOpen").prop("disabled", false);
        $("#thuClose").prop("disabled", false);
    }
});
$("#friCheckClosed").on("change", () => {
    if ($("#friCheckClosed")[0].checked) {
        $("#friCheck24").prop("disabled", true);
        $("#friOpen").prop("disabled", true);
        $("#friClose").prop("disabled", true);
    } else {
        $("#friCheck24").prop("disabled", false);
        $("#friOpen").prop("disabled", false);
        $("#friClose").prop("disabled", false);
    }
});
$("#friCheck24").on("change", () => {
    if ($("#friCheck24")[0].checked) {
        $("#friCheckClosed").prop("disabled", true);
        $("#friOpen").prop("disabled", true);
        $("#friClose").prop("disabled", true);
    } else {
        $("#friCheckClosed").prop("disabled", false);
        $("#friOpen").prop("disabled", false);
        $("#friClose").prop("disabled", false);
    }
});
$("#satCheckClosed").on("change", () => {
    if ($("#satCheckClosed")[0].checked) {
        $("#satCheck24").prop("disabled", true);
        $("#satOpen").prop("disabled", true);
        $("#satClose").prop("disabled", true);
    } else {
        $("#satCheck24").prop("disabled", false);
        $("#satOpen").prop("disabled", false);
        $("#satClose").prop("disabled", false);
    }
});
$("#satCheck24").on("change", () => {
    if ($("#satCheck24")[0].checked) {
        $("#satCheckClosed").prop("disabled", true);
        $("#satOpen").prop("disabled", true);
        $("#satClose").prop("disabled", true);
    } else {
        $("#satCheckClosed").prop("disabled", false);
        $("#satOpen").prop("disabled", false);
        $("#satClose").prop("disabled", false);
    }
});
$("#sunCheckClosed").on("change", () => {
    if ($("#sunCheckClosed")[0].checked) {
        $("#sunCheck24").prop("disabled", true);
        $("#sunOpen").prop("disabled", true);
        $("#sunClose").prop("disabled", true);
    } else {
        $("#sunCheck24").prop("disabled", false);
        $("#sunOpen").prop("disabled", false);
        $("#sunClose").prop("disabled", false);
    }
});
$("#sunCheck24").on("change", () => {
    if ($("#sunCheck24")[0].checked) {
        $("#sunCheckClosed").prop("disabled", true);
        $("#sunOpen").prop("disabled", true);
        $("#sunClose").prop("disabled", true);
    } else {
        $("#sunCheckClosed").prop("disabled", false);
        $("#sunOpen").prop("disabled", false);
        $("#sunClose").prop("disabled", false);
    }
});