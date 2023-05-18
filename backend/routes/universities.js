const router = require('express').Router();
let University = require('../models/university.model');
let Comment =  require('../models/comment.model');
let User = require('../models/user.model');
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const { unix } = require('moment');



router.route('/').get(async (req,res)=>{
    try {
        const result = await University.findById(req.query.id)
        res.send(result);
    } catch (e) {
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/rate').post(async (req,res)=>{
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
     
        const user = await User.findOne( {_id: token.id});
        const uni = await University.findById({ _id: req.query.id })



        user.ratingUnis.forEach((uniId) => {
            if (uniId == uni._id.toString()){
                res.send({ success: false, message: 'Already voted this university.' });
            }
        })
        
        const result = await University.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                edu_point : req.body.edu_point,
                dorm_point : req.body.dorm_point,
                trans_point : req.body.trans_point,
                campus_point : req.body.campus_point,
                rate_count : 1
            }
        }, { new: true })
        res.send(result);
        
        user.ratingUnis.push(uni._id.toString())
        await user.save();
        
    } catch (e) {
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/new_comment').post(async (req,res)=>{
    
    try {
    
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        
        const { username, content,} = req.body;

        const user = await User.findOne( {_id: token.id});
        user_id = user._id

        const uni = await University.findById(req.query.id)
        uni_id = uni._id

        const comment = new Comment({
          username,
          content,
          uni_id,
          user_id
        });

    
        const savedComment = await comment.save();
        res.send(savedComment);
    } catch (e) {
        const error = e;
        console.log(e)
        res.send({success: false, error: error }).status(400)   
    }

})

router.route('/show_comments').get(async (req,res)=>{

    try {
        const comments = await Comment.find({ uni_id: req.query.id });
        res.send(comments)
    } catch (e) {
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }

})

router.route('/like_comment').post(async (req,res)=>{
    try {
    
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        
        const result = await Comment.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                like_count : 1
            }
        }, { new: true })

        res.send(result);
    } catch (e) {
        console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/dislike_comment').post(async (req,res)=>{
    try {
    
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        
        const result = await Comment.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                dislike_count : 1
            }
        }, { new: true })

        res.send(result);
    } catch (e) {
        console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/delete_comment').post(async (req,res)=>{


    const accessToken = req.cookies["access-token"];
    const token = verify(accessToken , process.env.JWT_SECRET);
    const user = await User.findOne( {_id: token.id});

    try {

    
        const comment = await Comment.findById({_id : req.query.id});
        
        if (user.id === comment.user_id) {
            
            await Comment.findByIdAndDelete(req.query.id);
            res.send({ success: true, message: 'Kayıt silindi.' });
          } else {
            res.send({ success: false, message: 'Yetkilendirme hatası.' });
          }

    } catch (e) {
        console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }

})


module.exports = router;