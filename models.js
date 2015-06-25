var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/pindb");

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    default: ''
  }
});

var PinSchema = new mongoose.Schema({
  location: {
    type: String,
    default: ""
  },
  count: {
    type: Number,
    default: 0
  },
  comments: []
});

var Pin = mongoose.model("Pin", PinSchema);
var Comment = mongoose.model("Comment", CommentSchema);
module.exports.Pin = Pin;
module.exports.Comment = Comment;
