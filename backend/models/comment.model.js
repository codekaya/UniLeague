const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

      username: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      uni_id: {
        type: String,
        required: true
      },
      user_id: {
        type: String,
        required: true
      },
      like_count: {
        type: Number,
        default: 0
      },
      dislike_count: {
        type: Number,
        default: 0
      }
    });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;