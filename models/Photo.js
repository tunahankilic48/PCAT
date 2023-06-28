const mongoose = require('mongoose');
const schema = mongoose.Schema;

// //Create Schema
const photoSchema = new schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const photo = mongoose.model('Photo', photoSchema);

module.exports = photo;
