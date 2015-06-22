
// Variables
var searchTagForm = $('#tag_search_form');
var searchTag = $('#search_tag'); // <--Search input folder
var searchTagValue = ''; // <--- Value of the input form
var loc = ''; // <--- Coordinates of the search, return i.e. {A: 48.856614, F: 2.3522219000000177}
var lat = 51.534488;
var log = -0.189897;


// Google maps style

function initialize() {
  var styles = [
  {
    featureType: "all",
    stylers: [
    { saturation: -80 
    }]},
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
      ]},
      {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{
         visibility: "off" 
        }]}
];
  var styledMap = new google.maps.StyledMapType(styles,{
    name: "Styled Map"
  });
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    center: new google.maps.LatLng(lat, log),
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

// Google Maps render a map on the page with the style describe prevously
function renderMap() {
  google.maps.event.addDomListener(window, 'load', initialize);
}

renderMap();


//Geocoder

var geocoder = new google.maps.Geocoder();

// This function return the input value as coordinates and store it on a variables called loc
function searchFunction (event) { 
  event.preventDefault();
  searchTagValue = $('#search_tag').val();
    geocoder.geocode(
        {'address': searchTagValue},
        function(results, status) { 
            if (status == google.maps.GeocoderStatus.OK) { 
                loc = results[0].geometry.location;
                console.log(loc);
                console.log(loc.A);
                console.log(loc.F);
                lat = loc.A;
                log = loc.F;
            } 
            else {
                alert("Not found: " + status); // <-- On styling change to a div to show or hide error
            } 
        }
    );
};

//Event listeners
$(document).ready(function(){ 
  searchTagForm.on('submit', searchFunction); // Event listener for the form,
  searchTagForm.on('submit', renderMap); // Event listener for the form,
})


