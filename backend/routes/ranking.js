const router = require('express').Router();
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const { unix } = require('moment');


let University = require('../models/university.model');
let User = require('../models/user.model');

router.route('/').get(async (req,res)=>{
    const all_uni_info = await University.find({},{})
    res.render('ranking',{
        all_uni_info:all_uni_info
    })
})






module.exports = router;