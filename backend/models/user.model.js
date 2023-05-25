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
      required: true,
      unique:true,
      default: "00000000000"
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

}
); 

const User = mongoose.model('User', userSchema);
module.exports = User;