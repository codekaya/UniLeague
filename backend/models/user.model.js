const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    isValidated: {
        type: Boolean,
        reuired: true,
        default: false
    },
    ratingUnis:{
       type: Array,
       required: true,
       default: []
    }
}
); 

const User = mongoose.model('User', userSchema);
module.exports = User;