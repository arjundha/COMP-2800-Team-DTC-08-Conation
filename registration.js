function checkPasswordMatch() {
    var password = $("#passwordInput").val();
    var confirmPassword = $("#passwordConfirm").val();

    if (password != confirmPassword){
        $("#divCheckPasswordMatch").html("Passwords do not match!");
        $("#divCheckPasswordMatchTrue").html("");
    }
    else{
        $("#divCheckPasswordMatch").html("");
        $("#divCheckPasswordMatchTrue").html("Passwords match.");
    }
}

function checkPasswordIsValid(input) {
    if (input.value != document.getElementById('passwordInput').value) {
        input.setCustomValidity('Passwords Must be Matching.');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}

function finalPasswordCheck() {
    if (document.getElementById('passwordInput').value != document.getElementById('passwordConfirm').value) {
        document.getElementById('passwordInput').setCustomValidity('Passwords Must be Matching.');
    } else {
        // input is valid -- reset the error message
        document.getElementById('passwordInput').setCustomValidity('');
    }
}

function verifyPasswordsMatch(){
    let password = document.getElementById("passwordInput").value;
    let confirmPassword = document.getElementById("passwordConfirm").value;
    if (password != confirmPassword){
        alert("The passwords no not seem to match, please try again.");
        password = "";
        confirmPassword = "";
        
    }else{
        return true
    }
}


