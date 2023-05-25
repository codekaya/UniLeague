const router = require('express').Router();
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const { unix } = require('moment');


let University = require('../models/university.model');
let User = require('../models/user.model');

router.route('/').get(async (req,res)=>{
    const all_uni_info = await University.find({},{})
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        res.render('ranking',{
            userType:"loggedIn",
            all_uni_info:all_uni_info
        })
    } catch (error) {
        if(error.name === "JsonWebTokenError"){
            res.render('ranking',{
                userType:"visitor",
                all_uni_info:all_uni_info
            })
        }
    }
})






module.exports = router;