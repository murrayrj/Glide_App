var socket = io('http://4f3858c8.ngrok.io');
var photos = [];

socket.on('connect', function () {
  console.log('Connected!');
});

socket.on('instagram', function (object) {
  console.log(object);
  $.ajax({
    url: 'https://api.instagram.com/v1/tags/' +  object[0].object_id + '?client_id=861d1fc4976b4559a8c2c61e01add86a',
    dataType: 'jsonp'
  }).done(function (response) {
    console.log(response);
    console.log(response.data[1]);
    if (photos.indexOf(response.data[0].id) === -1 && response.data[0].type === "video") {
      $('#photo-container').prepend('<li class="animated bounceInLeft"><video src="' + response.data[0].videos.low_resolution.url + '" controls></video></li>');
      photos.push(response.data[0].id);
    } else {
      console.log('duplicate');
    }
  });
});

