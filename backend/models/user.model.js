const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
      required:true,
      type: String,
    },
    last_name: {
      required:true,
      type: String,
      },
    isUniStudent: {
      type: Boolean,
      required: true,
      default: false
        },
    uni_id: {
      type: String
        },  
    email: {
      type: String,
      required: true,
      unique:true
    },
    phone: {
      type: String,
      default: ""
    },
    faculty: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
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
        required: true,
        default: false
    },
    ratingPoints:{
       type: Array,
       required: true,
       default: []
    },
    isRated: {
      type: Boolean,
      required: true,
      default: false
  },
    web_url: {
      type: String,
      default: ""
  },
  github_url: {
      type: String,
      default: ""
  },
  twitter_url: {
      type: String,
      default: ""
  },
  instagram_url: {
      type: String,
      default: ""
  },
  facebook_url: {
      type: String,
      default: ""
  },
  about:{
      type:String,
      default: ""
  }
}
); 

const User = mongoose.model('User', userSchema);
module.exports = User;