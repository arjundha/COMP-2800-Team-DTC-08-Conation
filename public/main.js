$(document).ready(function() {
    $('#businessProfileChange').on('click', postBusinessProfileChange());
    $('#businessPasswordChange').on('click', postBusinessPasswordChange());
    $('#businessInfoChange').on('click', postBusinessInfoChange());

});

function postBusinessProfileChange() {
    $.ajax({
        url: '/updateBusinessProfile',
        method: 'POST',
        data: {
            username: $('#username').val(), // This doesn't need to be here, but since we don't have sessions yet...
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val()
        }
        }).done(function(data) {
        alert(data.success);
        }).fail(function(error) {
        console.log(error);
        });
}

function postBusinessPasswordChange() {
    $.ajax({
        url: '/updateBusinessPassword',
        method: 'POST',
        data: {
            username: $('#username').val(), // SHOULD BE ID BASED
            password: $('#passwordConfirm').val() // PASSWORD NEEDS HASHING
        }
    }).done(function(data) {
        alert(data.success);
    }).fail(function(error) {
        console.log(error);
    });
}

function postBusinessInfoChange() {
    $.ajax({
    url: '/updateBusinessInfo',
    method: 'POST',
    data: {
        username: $('#username').val(), // SHOULD BE ID BASED
        address: $('#address').val(),
        address2: $('#address2').val(),
        province: $('#province').val(),
        city: $('#city').val(),
        postal: $('#postal').val(),
        description: $('#description').val(),
        category: $('#category').val()
    }
  }).done(function(data) {
    alert(data.success);
  }).fail(function(error) {
    console.log(error);
  });
}


/*window.onload(smoothAutoScroll());

function smoothAutoScroll(){

  $(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  })
}*/


