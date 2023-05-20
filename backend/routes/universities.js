const router = require('express').Router();
let University = require('../models/university.model');
let Comment =  require('../models/comment.model');
let User = require('../models/user.model');
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');
const { unix } = require('moment');




router.route('/').get(async (req,res)=>{
    try {
        const uni = await University.findById(req.query.id)
        const uni_comment = await Comment.find({ uni_id: req.query.id })
        res.render("university_page",{
            uni_info:uni,
            comment_info: uni_comment
          })
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


        for (const uniId of user.ratingUnis) {
            if (uniId == uni._id.toString()) {
                const uniId = req.query.id;
                const redirectUrl = `/university/?id=${uniId}`;
                return res.send('<script>alert("You have already voted."); window.location.href="' + redirectUrl + '";</script>');
            }
        }
        
        const result = await University.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                edu_point : parseInt(req.body.edu_point),
                dorm_point :  parseInt(req.body.dorm_point),
                trans_point :  parseInt(req.body.trans_point),
                campus_point :  parseInt(req.body.campus_point),
                rate_count : 1
            }
        }, { new: true })
   
        user.ratingUnis.push(uni._id.toString())
        await user.save();
        const uniId = req.query.id;
        const redirectUrl = `/university/?id=${uniId}`;
        res.redirect(redirectUrl);
        
    } catch (e) {
        if(e.name === 'JsonWebTokenError'){
            redirectUrl = `/university/?id=${req.query.id}`;
            return res.send('<script>alert("You need to login to rate universities."); window.location.href="' + redirectUrl + '";</script>');
        }
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/new_comment').post(async (req,res)=>{
    
    try {
    
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);    

        const { username, content} = req.body;

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
        const uniId = req.query.id;
        const redirectUrl = `/university/?id=${uniId}`;
        res.redirect(redirectUrl);
    } catch (e) {
        if(e.name === 'JsonWebTokenError'){
            redirectUrl = `/university/?id=${req.query.id}`;
            return res.send('<script>alert("You need to login to post comment"); window.location.href="' + redirectUrl + '";</script>');
        }
        const error = e;
        //console.log(e)
        res.send({success: false, error: error }).status(400)   
    }

})

//Silinebilir.
router.route('/show_comments').get(async (req,res)=>{

    try {
        const comments = await Comment.find({ uni_id: req.query.id });
        res.send(comments)
    } catch (e) {
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }

})


//Kullanıcı her commente sadece bir like veya bir dislike atabilmeli
router.route('/like_comment').get(async (req,res)=>{

    try {
         
        const accessToken = req.cookies["access-token"];
        console.log(accessToken)
        const token = verify(accessToken , process.env.JWT_SECRET);
      

        const result = await Comment.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                like_count : 1
            }
        }, { new: true })
        const uniId = result.uni_id;
        const redirectUrl = `/university/?id=${uniId}`;
        res.redirect(redirectUrl);
        
    } catch (e) {
        //console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

//Kullanıcı her commente sadece bir like veya bir dislike atabilmeli
router.route('/dislike_comment').get(async (req,res)=>{
    try {
    
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        
        const result = await Comment.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                dislike_count : 1
            }
        }, { new: true })

        const uniId = result.uni_id;
        const redirectUrl = `/university/?id=${uniId}`;
        res.redirect(redirectUrl);
        
    } catch (e) {
        //console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/delete_comment').get(async (req,res)=>{
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        const user = await User.findOne( {_id: token.id});
        const comment = await Comment.findById({_id : req.query.id}); 

    

        
        if (user.id === comment.user_id) {

            result = await Comment.findByIdAndDelete(req.query.id);
            const uniId = result.uni_id;
            const redirectUrl = `/university/?id=${uniId}`;
            res.redirect(redirectUrl);
            
          } else {
            result = await Comment.findById(req.query.id);
            const uniId = result.uni_id;
            const redirectUrl = `/university/?id=${uniId}`;
            return res.send('<script>alert("Not Your Comment"); window.location.href="' + redirectUrl + '";</script>');
          }


    } catch (e) {
        console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }

})


module.exports = router;