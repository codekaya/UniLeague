const router = require('express').Router();
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const { unix } = require('moment');

let University = require('../models/university.model');
let User = require('../models/user.model');


router.route('/').get(async (req,res)=>{
    try {
        const all_uni_info = await University.find({},{ _id: 1,title: 1})
        res.render("home2",{
            all_uni_info:all_uni_info
          })
    } catch (e) {
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/login').get(async (req,res)=>{
    res.render('login')
})

router.route('/register').get(async (req,res)=>{
    const uni_id_title = await University.find({}, { _id: 1, title: 1 });
    res.render("register",{
        uni_id_title:uni_id_title
      })
})

module.exports = router;