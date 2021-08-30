const mongoose = require('mongoose');

const customSchema = mongoose.Schema({
  title: String,
  date: Date,
  active: Boolean,
  url: String
});

module.exports = mongoose.model('Custom', customSchema);
