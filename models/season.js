var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Phase = new Schema({
  title: {type: String, required: true},
  goals: [{type: String, required: false}],
  description: {type: String, required: true},
  start: Date,
  end: Date,
  milestones: [{
    date: Date,
    description: {type: String, required: true},
    reached: Boolean
  }]
})

var Season = new Schema({
  name: {type: String, required: true},
  author: ObjectId,
  description: {type: String, required: true},
  users: [ObjectId],
  phases: [Phase]
})
