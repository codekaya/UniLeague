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

        
        if (!user.isUniStudent){
            return res.send({success:false,error:{name:'You can not vote.'}})
        }
        if (user.isRated && (user.uni_id == uni._id) ) {
                return res.send({success:false,error:{name:'Already Voted'}})
            }
    
        if (!(user.uni_id == uni._id)){
                return res.send({success:false,error:{name:'Not member of this university'}})
        }
        
        edu_point_fe = parseInt(req.body.edu_point)
        dorm_point_fe = parseInt(req.body.dorm_point)
        trans_point_fe = parseInt(req.body.trans_point)
        campus_point_fe = parseInt(req.body.campus_point)

        const result = await University.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                edu_point : edu_point_fe,
                dorm_point :  dorm_point_fe,
                trans_point :  trans_point_fe,
                campus_point : campus_point_fe,
                rate_count : 1
            }
        }, { new: true })
        const newRatingPoints = [edu_point_fe,dorm_point_fe,trans_point_fe,campus_point_fe]
        await User.updateOne(
            { _id: user._id },
            { $push: { ratingPoints: { $each: newRatingPoints } },
              $set: { isRated: true } }
          );
        await user.save();
        res.send({success:true})
        
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
        await comment.save();
        res.send({success:true});
    } catch (e) {
        if(e.name === 'JsonWebTokenError'){
            return res.send({success:true,error:{name:'NotAuthorized'}});
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
        const token = verify(accessToken , process.env.JWT_SECRET);
        await Comment.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                like_count : 1
            }
        }, { new: true })
        res.send({success:true})
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
        
        await Comment.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                dislike_count : 1
            }
        }, { new: true })
        res.send({success:true})
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

            await Comment.findByIdAndDelete(req.query.id);
            res.send({success:true})
            
          } else {
            res.send({success:false,error:{name:'NotAuthorized'}}) // Yorum kullanıcıya ait değil
          }


    } catch (e) {
        console.log(e)
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }

})


module.exports = router;