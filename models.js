var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/locationdb");

var TagSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  }
});

var LocationSchema = new mongoose.Schema({
  text: {
    type: String,
    default: ""
  },
  count: {
    type: Number,
    default: 0
  },
  tags: [TagSchema]
});

var Location = mongoose.model("Location", LocationSchema);
var Tag = mongoose.model("Tag", TagSchema);
module.exports.Location = Location;
module.exports.Tag = Tag;
