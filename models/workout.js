var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patcher = require('mongoose-json-patch');

// IE: 5  x  100 @ 6:00 W/ Paddles (Distance Per Stroke)
// IE: 5 x __ @ 1:00 W/ Fins (Vertical Kicking)
// IE:
var setItemSchema = new  Schema({
  _id: false,
  order: {type: Number},
  description: {type: String},
  type: {type: String, enum: ['interval', 'rest', 'duration']},
  repeat: {type: Number, default: 1, required: false},
  distance: {type: Number, required: false},
  interval: {type: String},
  equipment: {type: [String]},
  specifications: {type: String}
});

var setSchema = new  Schema({
  _id: false,
  order: {type: Number},
  title: {type: String, required: false},
  tags: {type: String},
  repeat: {type: Number, default: 1},
  items: {type: [setItemSchema]},
  description: {type: String}
});

var workoutSchema = new Schema({
  title: {type: String, required: false},
  objective: {type: String},
  tags: {type: [String]},
  author: {type: Schema.Types.ObjectId, ref: 'users', required:  false},
  sets: {type: [setSchema]}
});

workoutSchema.plugin(patcher);

module.exports = mongoose.model('Workout', workoutSchema);
