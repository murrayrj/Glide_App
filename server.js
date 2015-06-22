var express = require('express');
var app = express();
var server = require('http').createServer(app);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var instagram = require('instagram-node-lib');
var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

instagram.set('client_id', 'client_id');
instagram.set('client_secret', 'client_secret');

instagram.set('callback_url', 'http://4f3858c8.ngrok.io/callback');
instagram.set('maxSockets', 50);

var tags = ['videos', 'videooftheday', 'videogram'];

for (var i = 0; i < tags.length; i++) {
  instagram.subscriptions.subscribe({ 
    object: 'tag', 
    object_id: tags[i]
  });
};

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/callback', function(req, res) {
  instagram.subscriptions.handshake(req, res); 
});

app.post('/callback', function(req, res) {
  console.log(req.body);

  var notification = req.body;
});

server.listen(port, function() {
  console.log('tj is cool!');
});

