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

var socket = io('http://d53c5486.ngrok.io');
var videos = [];
var i;

// Google maps style

function initialize() {
  var styles = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": "78"
            },
            {
                "lightness": "-22"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ff00ea"
            },
            {
                "saturation": "33"
            },
            {
                "lightness": "28"
            },
            {
                "weight": "1.89"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#bb1313"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "-27"
            },
            {
                "gamma": "1.88"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "89"
            },
            {
                "lightness": 40
            },
            {
                "hue": "#ff0000"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f1f1f1"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": "1.88"
            },
            {
                "weight": "1.14"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#a90000"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "38"
            },
            {
                "lightness": "23"
            },
            {
                "gamma": "5.25"
            },
            {
                "color": "#f91b1b"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a0d6d1"
            },
            {
                "lightness": 17
            }
        ]
    }
]

//end of snazzy map styling

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
    for (i = 0; i < 20; i++) {
      if (response.data[i].type === "video" && videos.indexOf(response.data[i].id) === -1) {
        if (videos.length >= 5) {
          return;
        } else {
          $('#video-container').prepend('<li><video src="' + response.data[i].videos.low_resolution.url + '" controls></video></li>');
          videos.push(response.data[i].id);
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
    url :'/tags/subscribe', 
    data: { 
      data: searchTerm
    },
    type: 'POST'
  })
  .done(function(response) {
    console.log(response);
  })
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



