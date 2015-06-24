// Variables
var searchTagForm = $('#tag_search_form');
var searchTag = $('#search_tag'); // <--Search input folder
var searchTagValue = ''; // <--- Value of the input form
var myLatlng = {A: 51.534488, F: -0.189897}; // <--- Coordinates of the search, return i.e. {A: 48.856614, F: 2.3522219000000177}
var lat = 51.534488;
var lng = -0.189897;
var map;
var geocoder = new google.maps.Geocoder();
var marker;
var socket = io('http://d913c569.ngrok.io');  
var videos = [];
var i;

// Google maps style

function initialize() {
  var styles = [
      {
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#00ffee" },
          { saturation: 50 }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }
    ];
  var styledMap = new google.maps.StyledMapType(styles, {
    name: "Styled Map"
  });
  var mapCanvas = document.getElementById('map-canvas');
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 12,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  myLatlng = new google.maps.LatLng(lat, lng);
  marker = new google.maps.Marker({
    position: myLatlng,
    title: "Hello World!",
    animation: google.maps.Animation.DROP
  });
  map = new google.maps.Map(mapCanvas, mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
  marker.setMap(map);
}

// Google Maps render a map on the page with the style describe previously

google.maps.event.addDomListener(window, 'load', initialize);

// This function return the input value as coordinates and store it on a variables called loc
function searchFunction(event) {
  var dfr = $.Deferred();
  event.preventDefault();
  searchTagValue = $('#search_tag').val();
  geocoder.geocode(
    {'address': searchTagValue},
    function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        myLatlng = results[0].geometry.location;
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        var coords = {
            searchTerm: searchTagValue,
            lat: lat,
            lng: lng
          };
        dfr.resolve(coords);
        console.log(myLatlng);
        console.log(lat);
        console.log(lng);
      } else {
        alert("Not found: " + status);

        dfr.reject('derrp');
      }
      map.setCenter(myLatlng);
      marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!",
        animation: google.maps.Animation.DROP
      });
      marker.setMap(map);
    }
  );
  return dfr.promise();
}

function getVideos(location) {
  return $.ajax({
    url: 'https://api.instagram.com/v1/tags/' + location + '/media/recent?client_id=fee1f7a9b22c41149f86e7a44f199935',
    dataType: 'jsonp'
  }).done(function (response) {
    console.log(response);
    console.log(location);
    for (i = 0; i < 20; i++) {
      if (response.data[i].type === "video" && videos.indexOf(response.data[i].id) === -1) {
        if (videos.length >= 5) {
          return;
        } else {
          console.log('response.data');
          console.log(response.data[i]);
          console.log(response.data[i].videos.low_resolution.url);
          console.log(response.data[i].location);
          console.log(response.data[i].location.latitude);
          lat = response.data[i].location.latitude;
          lng = response.data[i].location.longitude;
          myLatlng = new google.maps.LatLng(lat, lng);
          console.log(response.data[i].location.longitude);
        }
        if (response.data[i].tags.indexOf(location) > -1) {
          $('#video-container').prepend('<li><video src="' + response.data[i].videos.low_resolution.url + '" controls></video></li>');
          videos.push([response.data[i].id]);
          marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!",
            animation: google.maps.Animation.DROP
          });
          marker.setMap(map);
        }
      }
    }
  });
}


socket.on('connect', function () {
  console.log('Connected!');
});

function subsribeToTag(searchTerm) {
  $.ajax({
    url : '/tags/subscribe',
    data: {
      data: searchTerm
    },
    type: 'POST'
  })
    .done(function (response) {
      console.log(response);
    });
}

function getTag(event) {
  var promise = event.result;
  promise.then(function (coordinates) {
    subsribeToTag(coordinates.searchTerm);
    console.log(coordinates);
    console.log(coordinates.searchTerm);
    socket.on('instagram', function () {
      getVideos(coordinates.searchTerm);
    });
  });
}

//Event listeners
$(document).ready(function () {
  searchTagForm.on('submit', searchFunction);
  searchTagForm.on('submit', getTag);
});