const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tagSchema = new Schema({
  name: {
    type: String
  }
});

let Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;