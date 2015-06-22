
// var socket = io('http://4f3858c8.ngrok.io');
// var photos = [];

// socket.on('connect', function () {
//   console.log('Connected!');
// });

// socket.on('instagram', function (object) {
//   console.log(object);
//   $.ajax({
//     url: 'https://api.instagram.com/v1/tags/' +  object[0].object_id + '?client_id=861d1fc4976b4559a8c2c61e01add86a',
//     dataType: 'jsonp'
//   }).done(function (response) {
//     console.log(response);
//     console.log(response.data[1]);
//     if (photos.indexOf(response.data[0].id) === -1 && response.data[0].type === "video") {
//       $('#photo-container').prepend('<li class="animated bounceInLeft"><video src="' + response.data[0].videos.low_resolution.url + '" controls></video></li>');
//       photos.push(response.data[0].id);
//     } else {
//       console.log('duplicate');
//     }
//   });
// });


// Google maps 
console.log('hello')

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




