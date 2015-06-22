var videos = [];

  console.log(object);
  $.ajax({
    url: 'https://api.instagram.com/v1/tags/' +  object[0].object_id + '?client_id=CLIENT_ID',
    dataType: 'jsonp'
  }).done(function (response) {
    console.log(response);
    console.log(response.data[1]);
    if (videos.indexOf(response.data[0].id) === -1 && response.data[0].type === "video") {
      $('#video-container').prepend('<li class="animated bounceInLeft"><video src="' + response.data[0].videos.low_resolution.url + '" controls></video></li>');
      videos.push(response.data[0].id);
    } else {
      console.log('duplicate');
    }
  });
});

