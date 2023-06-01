const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  
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
      conversation_id: {
        type: String,
        required: true
      },
      likes: {
        type: Array,
        default: []
      },
      dislikes: {
        type: Array,
        default: []
      },
      isCommentedbyUniStudent: {
        type: Boolean,
        default: false,
        required: true
      },
    });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;