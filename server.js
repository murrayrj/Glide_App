var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var instagram = require('instagram-node-lib');
var port = process.env.PORT || 3000;
var i;
var tag = '';

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

instagram.set('callback_url', 'http://13eacc9b.ngrok.io/callback');

instagram.set('maxSockets', 50);

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/callback', function (req, res) {
  instagram.subscriptions.handshake(req, res);
});

app.post('/tags/subscribe', function (req, res) {
  tag = req.body.data;
  instagram.subscriptions.subscribe({
    object: 'tag',
    object_id: tag
  });
});

app.post('/callback', function (req, res) {
  console.log(req.body);
  console.log(req.body[0].object_id);

  var notification = req.body;

  io.sockets.emit('instagram', notification);
});

server.listen(port, function () {
  console.log('Pedro, Laura and Richard are cool!');
});