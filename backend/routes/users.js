const router = require('express').Router();
let User = require('../models/user.model');
let Comment =  require('../models/comment.model');
const { register, login, changePassword, changeEmail} = require('../controllers/user');
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const axios = require('axios');
const crypto = require('crypto');
const {sentEmail} = require('../controllers/emailVerification');
const moment  = require('moment');
const bcrypt = require('bcrypt');


router.route('/').get(async (req,res) =>{
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);

        const user = await User.findOne( {_id: token.id});
        res.send({user});
    } catch (e) {
        const error = e;
        res.send({success: false, error: error })   
    }
    
});

router.route('/profile').get(async (req, res) => {
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
       
        const user = await User.findOne( {_id: token.id});
        res.send({user});
    } catch (e) {
        const error = e;
        res.send({success: false, error: error })  
    }
});

router.route('/show_comments').get(async (req,res)=>{

    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);

        const comments = await Comment.find({ user_id: req.query.id });
        res.send(comments)
    } catch (e) {
        console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }

})



router.route('/register').post( async (req,res) =>{
    const result  = await register(req.body.email, req.body.password);
    res.send(result);
});

router.route('/login').post( async (req, res) => {
    res.cookie("access-token", "");
    const result = await login(req.body.email, req.body.password);
    if(result.valid){
        res.cookie("access-token", result.access, {
            maxAge: 60*60*24*1000 ,
            httpOnly: true
        });
        res.send({success: true});
    }
    else{
        res.send({success: false, response: result.error});
    }
    
    
});
router.route('/changePassword').post(async (req, res) => {
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        const oldPass = req.body.oldPassword;
        const newPass = req.body.newPassword;
        const result = await changePassword(token.id, oldPass, newPass);
        res.send(result);
    } catch (e) {
        const error = e;
        res.send({success: false, error: error })
    }  
});

router.route('/resetPassword').post(async (req, res) => {
    try {
        const email = req.body.email;
        const accessNumber = req.body.accessCode;
        const unhashed = req.body.newPassword;
        const time = Math.floor((new moment())/300000);
        const hash = crypto.createHash('sha1').update((email+time+"sjfgjsdfksjd")).digest('hex');
        const Code = hash.substring(30,36);
        if(accessNumber == Code){
            const newPassword = await bcrypt.hash(unhashed, 10)
            const log = await User.updateOne({email : email }, { password : newPassword });
            res.send({success: true});
        }
        else{
            res.send({success: false, error: "WRONG CODE"})
        }
        
    } catch (e) {
        const error = e;
        res.send({success: false, error: error});
    }
});

router.route('/changeEmail').post(async (req, res) => {
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        const password = req.body.password;
        const newEmail = req.body.newEmail;
        const result = await changeEmail(token.id, password, newEmail);
        res.send(result);

    } catch (e) {
        const error = e;
        res.send({success: false, error: error })
    }
    
});
router.route('/emailVerify').post(async (req, res) => {
    try {
        console.log(req.body.email,req.body.accessCode)
        const email = req.body.email;
        const accessNumber = req.body.accessCode;

        const time = Math.floor((new moment())/300000);
        const hash = crypto.createHash('sha1').update((email+time+"sjfgjsdfksjd")).digest('hex');
        const Code = hash.substring(30,36);
        if(accessNumber == Code){
            const log = await User.updateOne({email : email }, { isValidated : true });
            res.send({success: true});
        }
        else{
            res.send({success: false, error: "WRONG CODE"})
        }
    }
    catch(err){
        const error = err;
        res.send({success: false, error: error});
    }
});
router.route('/getEmailCode').post(async (req, res) => {
    try {
        const email = req.body.email;
        await sentEmail(email);
        res.send({success: true});
    } catch (e) {
        const error = e;
        res.send({success: false, error: error })  
    }
})

router.route('/logout').get(isValidated, async (req,res) => {
    res.cookie("access-token", "");
    res.send({success: true});
});

module.exports = router;