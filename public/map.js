// Needed to define Global Variables otherwise the Map would not make markers from database
let map;
let geocoder;
geocoder = new google.maps.Geocoder();

// jQuery for the AJAX call to fill map with locations
$('document').ready(function(){
  initMap();
  addMarker({ coords: {lat: 80.9999793, lng: -135.0007473},
              iconImage: "https://img.icons8.com/color/48/000000/santa.png",
              content: contentMaker({name: "Santa's Workshop", description: "An emporium full of toys and elves", address: "North Pole"})});

  $.ajax('/getBusinesses')
  .done(function(data) {
      for (i = 0; i < data.length; i++){
        // console.log(data[i]);
        // NEEDS to be timed out otherwise it will fail after three tags
        codeAddress(data[i])
        // setTimeout(codeAddress(data[i]), 8000);
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
      center: {lat: 49.289031, lng: -123.1297058}, // Default starting location
      // center: {lat: 48.427502, lng: -123.367264}, // Default starting location
      zoom: 15
      });

    // Array of test markers
    let markers = [
    {
      coords:{lat:48.4271342,lng:-123.3695606},
      content:'<h3>Il Terrazo</h3>'
    },
    {
        coords:{lat:48.4263023,lng:-123.3631996,},
        content: `
        <h3>Fan Favourites</h3>
        <p>We are a local used game store</p>
        <p>We are open for pick-up on weekends</p>
        <p>Our website is www.google.ca</p>
        `

    },
    ];


      // Create the search box and link it to the UI element.
      let input = document.getElementById('pac-input');
      let searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

    // Loop through markers
    for(var i = 0;i < markers.length;i++){
    // Add marker
      addMarker(markers[i]);
    }

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

// Get lat long from address
function codeAddress(obj) {
  console.log("STARTING FUNCTION");
  // geocoder.geocode({ 'address': obj.address, 'componentRestrictions':{'country':'CA'}}, function (results, status) {
  //     if (status == 'OK') {
  //       console.log("STATUS OK");
  //         //     var marker = new google.maps.Marker({
  //         //     position: results[0].geometry.location,
  //         //     map: map,
  //         // });
  //         let description = contentMaker(obj);
  //         console.log(results[0].geometry.location.lat())
  //         console.log(results[0].geometry.location.lng())
  //         // console.log(typeof(results[0].geometry.location.lng()))
  //         addMarker({coords: results[0].geometry.location, content: description});
  //     } else {
  //         console.log('Geocode was not successful for the following reason: ' + status);
  //     }
  // });
  let description = contentMaker(obj);
  addMarker({coords: {lat: obj.lat, lng: obj.lng}, content: description});


}

// Create tag contents from business info
function contentMaker(obj){
  title = obj.name;
  description = obj.description;
  address = obj.address;
  

  return "<h3>" + title + "</h3><p><i>" + description + "</i></p><p>" + address + "</p>"

}