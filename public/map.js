// Needed to define Global Variables otherwise the Map would not make markers from database
let map;
let geocoder;
geocoder = new google.maps.Geocoder();

// jQuery for the AJAX call to fill map with locations
$('document').ready(function(){
  initMap();
  addMarker({ coords: {lat: 80.9999793, lng: -135.0007473},
              iconImage: "https://img.icons8.com/color/48/000000/santa.png",
              content: contentMaker({
                name: "Santa's Workshop", 
                description: "An emporium full of toys and elves that never takes a day off.", 
                address: "123 Candycane Lane",
                city: "North Pole",
                province: "Christmasville",
                mon: "?",
                tue: "?",
                wed: "?",
                thu: "?",
                fri: "?",
                sat: "?",
                sun: "?",
                id: 0

              })});

  $.ajax('/getBusinesses')
  .done(function(data) {
      for (i = 0; i < data.length; i++){
        // console.log(data[i]);
        codeAddress(data[i])
      }
  })
  .fail(function(error){
      console.log(error);
  })

})
  
// Map initializier
function initMap() {
    // initalize map
    map = new google.maps.Map(document.getElementById('map'), {
      // Default starting location (DT Vancouver)
      center: {lat: 49.289031, lng: -123.1297058}, 
      // center: {lat: 48.427502, lng: -123.367264}, // Default starting location for Victoria (testing purposes)
      zoom: 15
      });

    // Array of test markers
    // let markers = [
    // {
    //   coords:{lat:48.4271342,lng:-123.3695606},
    //   content:'<h3>Il Terrazo</h3>'
    // },
    // {
    //     coords:{lat:48.4263023,lng:-123.3631996,},
    //     content: `
    //     <h3>Fan Favourites</h3>
    //     <p>We are a local used game store</p>
    //     <p>We are open for pick-up on weekends</p>
    //     <p>Our website is www.google.ca</p>
    //     `

    // },
    // ];

    // // Loop through markers
    // for(var i = 0;i < markers.length;i++){
    //   // Add marker
    //   addMarker(markers[i]);
    // }

    // Browser asks for location
    let infoWindow = new google.maps.InfoWindow;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('You are near here!');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// Add Marker Function
function addMarker(props){
  let marker = new google.maps.Marker({
    position:props.coords,
    map:map,
    //icon:props.iconImage
  });

  // Check for customicon
  if(props.iconImage){
    // Set icon image

    marker.setIcon(props.iconImage);
  }

  // Check content
  if(props.content){
    let infoWindow = new google.maps.InfoWindow({
    content:props.content
    });

    marker.addListener('click', function(){
    infoWindow.open(map, marker);
    });
  }
}

// Function for creating descriptive markers for each business
function codeAddress(obj) {
  console.log("STARTING FUNCTION");
  let description = contentMaker(obj);
  addMarker({coords: {lat: obj.lat, lng: obj.lng}, content: description});
}

// Create tag contents from business info
function contentMaker(obj){
  // Business Info
  let title = obj.name;
  let description = obj.description;
  let id = obj.id;

  // Address Info
  let address = obj.address;
  let city = obj.city;
  let prov = obj.province;
  let postal = obj.postal_code;

  // Create structure for each day's hours
  let mon = "Monday: " + obj.mon +"<br>";
  let tues = "Tuesday: " + obj.tue +"<br>";
  let wednes = "Wednesday: " + obj.wed +"<br>";
  let thurs = "Thursday: " + obj.thu +"<br>";
  let fri = "Friday: " + obj.fri +"<br>";
  let sat = "Saturday: " + obj.sat +"<br>";
  let sun = "Sunday: " + obj.sun;

  // Construct Messages
  let firstMessage = "<h3>" + title + "</h3><p><i>" + description + "</i></p>";
  let fullAddress = "<p>" + address + ", " + city + ", " + prov + "</p>";
  let fullHours = "<p><b>Hours of Operation:</b></p><p>"+ mon + tues + wednes + thurs + fri + sat + sun +"</p>";

  if (id == 0) {
    // This is for Santa
    let site = "<br><a href='/easteregg'>Play Game</a>"
    // Return the messages strung together
    return firstMessage + fullAddress + fullHours + site
  }
  else {
    let site = "<br><a href='/business/"+id+"'>View Profile</a>"
    // Return the messages strung together
    return firstMessage + fullAddress + fullHours + site
  }



}