var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
  author: {type: ObjectId, required: true},
  subject: {type: ObjectId, required: true},
  body: String,
  rating: {type: Number, required: true, min: 1, max: 5}
})

module.exports = mongoose.model('Review', Review);
