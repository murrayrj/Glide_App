var REPL = require('repl');
var db = require('./models');

var repl = REPL.start("Pins >");

repl.context.db = db;

db.Pin.collection.remove();
db.Comment.collection.remove();

db.Pin.create({
  location: 'London',
}, function(err, pin){
  db.Comment.create({
    text: 'I love the London Eye!'
  }, function(err, comment){
    pin.comments.push(comment);
    pin.save();
    console.log('data seeded');
    //Take care with process.exit(), this will break the code
    // process.exit()
  })
});

db.Pin.create({
  location: 'New York',
}, function(err, pin){
  db.Comment.create({
    text: 'I love NYC'
  }, function(err, comment){
    pin.comments.push(comment);
    pin.save();
    console.log('data seeded');
    //Take care with process.exit(), this will break the code
    // process.exit()
  })
});



