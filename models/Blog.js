const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  date: Date,
  readlength: Number,
  url: String
});

module.exports = mongoose.model('Blog', blogSchema);
