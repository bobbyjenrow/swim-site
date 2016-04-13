var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Thread = new Schema({
  users: [ObjectId],
  messages: [ObjectId],
  lastActive: Date
});

module.exports = mongoose.model('Thread', Thread);
