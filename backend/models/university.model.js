const mongoose = require('mongoose');

const University = mongoose.model('University',mongoose.Schema({
    title: String,
    web_address: String,
    email: String,
    phone: String,
    Type: String,
    id: Number,
    Province: String,
    Foundation: String,
    Region: String,
    edu_point: Number,
    dorm_point: Number,
    trans_point: Number,
    campus_point: Number,
    unileague_point: Number,
    rate_count: Number
}),'universities');

module.exports = University;