const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
  }],
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'answer'
  }],
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  created_at: {
    type: Date,
    default: new Date
  },
  updated_at: {
    type: Date
  },
});

let Question = mongoose.model('question', questionSchema);

module.exports = Question;