const router = require('express').Router();
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const { unix } = require('moment');

let University = require('../models/university.model');
let User = require('../models/user.model');


router.route('/').get(async (req,res)=>{

    try {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        const all_uni_info = await University.find({},{ _id: 1,title: 1})
        res.render("home",{
            userType:"loggedIn",
            all_uni_info:all_uni_info
          })
    } catch (e) {
        if(e.name === "JsonWebTokenError"){
            const all_uni_info = await University.find({},{ _id: 1,title: 1})
            return res.render("home",{
                userType:"visitor",
                all_uni_info:all_uni_info
            })
        }
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/login').get(async (req,res)=>{
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
    } catch (error) {
        return res.render("login")
    }
    res.redirect("/")
})

router.route('/register').get(async (req,res)=>{
    const accessToken = req.cookies["access-token"];
    try {
        const token = verify(accessToken , process.env.JWT_SECRET);
    } catch (error) {
        const uni_id_title = await University.find({}, { _id: 1, title: 1 });
        return res.render("register",{
            uni_id_title:uni_id_title
          })
    }
    res.redirect("/")
})

router.route('/comparison').get(async (req,res)=>{
    const all_uni_info = await University.find({},{})  
    try{
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        return res.render("comp",{
                all_uni_info:all_uni_info,
                userType:"loggedIn"
           })
    }
    catch(error){
        if(error.name==="JsonWebTokenError"){
           return res.render("comp",{
                all_uni_info:all_uni_info,
                userType:"visitor"
           })
        }
    }
    
});

router.route('/verification').get(async (req,res)=>{

    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        res.render('verification',{
            userType:"loggedIn"
        })
    } catch (error) {
        res.redirect("/")
    }
    
     
 });

router.route('/ranking').get(async (req,res)=>{
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

router.route('/forgotPassword').get(async (req,res)=>{
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        res.redirect("/")
    } catch (error) {
        if(error.name==="JsonWebTokenError") return res.render('forgotPassword')
        res.send({success:true,error:error})
    }

})

module.exports = router;