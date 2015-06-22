var REPL = require('repl');
var db = require('./models');

var repl = REPL.start("Locations >");

repl.context.db = db;

db.Location.collection.remove();
db.Tag.collection.remove();

db.Location.create({
  name: 'Amsterdam',
}, function (err, location) {
  db.Tag.create({
    text: 'amsterdam, water, vangoghmuseum'
  }, function (err, tag) {
    location.tags.push(tag);
    location.save();
    console.log('data seeded');
    //Take care with process.exit(), this will break the code
    // process.exit()
  });
});

db.Location.create({
  name: 'Tower of London',
}, function (err, location) {
  db.Tag.create({
    text: 'thames, towerbridge, toweroflondon'
  }, function (err, tag) {
    location.tags.push(tag);
    location.save();
    console.log('data seeded');
    //Take care with process.exit(), this will break the code
    // process.exit()
  });
});

db.Location.create({
  name: 'Bologna',
}, function (err, location) {
  db.Tag.create({
    name: 'provincia, bologna'
  }, function (err, tag) {
    location.tags.push(tag);
    location.save();
    console.log('data seeded');
    //Take care with process.exit(), this will break the code
    // process.exit()
  });
});

db.Location.create({
  name: 'Notre-Dame de Paris',
}, function (err, location) {
  db.Tag.create({
    name: 'notredame, laseine'
  }, function (err, tag) {
    location.tags.push(tag);
    location.save();
    console.log('data seeded');
    //Take care with process.exit(), this will break the code
    // process.exit()
  });
});
