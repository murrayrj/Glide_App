// Variables
var searchTagForm = $('#tag_search_form');
var searchTag = $('#search_tag'); // <--Search input folder
var searchTagValue = ''; // <--- Value of the input form
var loc = ''; // <--- Coordinates of the search, return i.e. {A: 48.856614, F: 2.3522219000000177} 

// Render a map when the page loads
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
    center: new google.maps.LatLng(51.534488, -0.189897),
    zoom: 15,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

google.maps.event.addDomListener(window, 'load', initialize);


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
            } 
            else {
                alert("Not found: " + status); // <-- On styling change to a div to show or hide error
            } 
        }
    );
};

//Render a new map

function renderNewMap (event) {
  console.log('renderNewMap')

}

//Event listeners
$(document).ready(function(){ 
  searchTagForm.on('submit', searchFunction);  // Event listener for the form,
  searchTagForm.on('submit', renderNewMap); // Event listener to create a new map
})