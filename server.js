var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var morgan = require('morgan');
var request = require('request');
var bodyParser = require('body-parser');
var instagram = require('instagram-node-lib');
var request = require('request');
var port = process.env.PORT || 3000;
var i;
var tag;

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
instagram.set('client_secret', '0526486007d44e8eac7edb211b03fbe3');
instagram.set('callback_url', 'http://66975c74.ngrok.io/callback'); 
instagram.set('maxSockets', 50);

app.get('/', function (req, res) {
  res.render('index');
});

function unsubscribe(err, response, body) {
  var bodyParse = JSON.parse(body);
  var subscribedTags = bodyParse.data;
  for (i = 0; i < subscribedTags.length; i++) {
    var tagId = subscribedTags[i].id;
    console.log(tagId);
    instagram.subscriptions.unsubscribe({id: tagId});
  }
};

app.get('/unsubscribeAll', function (req, res) {
  var url = 'https://api.instagram.com/v1/subscriptions\?object\=all\&client_id\=' + process.env.INSTAGRAM_CLIENT_ID + '\&client_secret\=' + process.env.INSTAGRAM_CLIENT_SECRET;
  request(url, unsubscribe);
});

app.get('/callback', function (req, res) {
  instagram.subscriptions.handshake(req, res);
});

app.post('/callback', function (req, res) {
  console.log(req.body);
  var notification = req.body;

  io.sockets.emit('instagram', notification);
});

app.post('/tags/subscribe', function (req, res) {
  tag = req.body.data;

  instagram.subscriptions.subscribe({
    object: 'tag',
    object_id: tag
  });
});

server.listen(port, function () {
  console.log('Pedro, Laura and Richard are cool!');
});

app.get('/pins', function(req, res){
   db.Pin.find({}, function(err, pins){
    res.send(pins);
  })
})

app.post('/pins', function(req, res){
  db.Pin.create(req.body, function(err, comment){
    res.send(201, comment); //success, object created
  })
})

app.delete("/pins/:id", function (req, res){
  var pinId = req.params.id;
  db.Pin.findByIdAndRemove({
    _id: pinId
  }, function(err, comment){
    res.send(204); //Success, no content
  })
});