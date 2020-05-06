function initMap() {
    // initalize map
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.427502, lng: -123.367264},
        zoom: 15
    });

    // Array of markers NEED TO BE CREATED FROM DATABASE
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
    {
        // coords:{lat:42.7762,lng:-71.0773}
        // content: `
        // <h3><=Business Name></h3>
        // <p>Description</p>
        // <p>Hours of operation</p>
        // <p>Website or link to business page</p>

    }
    ];

    // Loop through markers
    for(var i = 0;i < markers.length;i++){
    // Add marker
    addMarker(markers[i]);
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
