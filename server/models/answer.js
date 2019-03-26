const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
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
  }
});

let Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;