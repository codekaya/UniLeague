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
        const user = await User.find({},{_id:1,name:1,last_name:1,uni_id:1})
        let loggedUserId = null;
        try {
            const accessToken = req.cookies["access-token"];
            const token = verify(accessToken , process.env.JWT_SECRET);
            loggedUserId = token.id
        } catch (error) {
            return res.render("university_page",{
                uni_info:uni,
                comment_info: uni_comment,
                user_info:user,
                userType:"visitor",
                isRated:true
              })
        }
        const loggedUser = await User.findOne({_id:loggedUserId},{ratingPoints:1})
        res.render("university_page",{
            uni_info:uni,
            comment_info: uni_comment,
            user_info:user,
            userType:"loggedIn",
            isRated:loggedUser.ratingPoints.length===4 ? true : false
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


        if (!user.isValidated){
            return res.send({success:false,error:{name:'Puan vermek için mail adresinizi onaylamalısınız!'}})
        }

        if (!user.isUniStudent){
            return res.send({success:false,error:{name:'Sadece üniversite öğrencileri puan verebilir!'}})
        }

        if (!(user.uni_id == uni._id)){
            return res.send({success:false,error:{name:'Bu üniversite öğrencisi değilsiniz!'}})
    }

        if (user.isRated && (user.uni_id == uni._id) ) {
                return res.send({success:false,error:{name:'Daha öneceden puan verdiniz!'}})
            }

        console.log(req.body)
        edu_point_fe = parseInt(req.body.edu_point)
        dorm_point_fe = parseInt(req.body.dorm_point)
        trans_point_fe = parseInt(req.body.trans_point)
        campus_point_fe = parseInt(req.body.campus_point)
        if(edu_point_fe <= 0 || dorm_point_fe <= 0 || trans_point_fe <= 0 || campus_point_fe <= 0 || 
            edu_point_fe > 10 || dorm_point_fe > 10 || trans_point_fe > 10 || campus_point_fe > 10 ){
                return res.send({success:false,error:{name:'Lüten puanlarınızı 1 ile 10 arasında giriniz!'}})
            }
        const result = await University.findOneAndUpdate({_id : req.query.id},{
            $inc : {
                edu_point : edu_point_fe,
                dorm_point :  dorm_point_fe,
                trans_point :  trans_point_fe,
                campus_point : campus_point_fe,
                rate_count : 1,
                unileague_point: (edu_point_fe + dorm_point_fe + trans_point_fe + campus_point_fe) / 4,
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
            return res.send({success:false,error:{name:"Puan vermek için giriş yapmalısınız!"}});
        }
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

router.route('/new_comment').post(async (req,res)=>{
    
    try {
      
    
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);    
        const {content, conversation_id} = req.body;
        
        console.log(req.body)

        const user = await User.findOne( {_id: token.id});
        user_id = user._id

        if (!user.isValidated){
            return res.send({success:false,error:{name:'Yorum yapmak için kayıt olmalısınız!'}})
        } 

        const uni = await University.findById(req.query.id)
        uni_id = uni._id
        
        const comment = new Comment({
          content,
          uni_id,
          user_id,
          conversation_id,
        });
        await comment.save();
        res.send({success:true});
    } catch (e) {
        if(e.name === 'JsonWebTokenError'){
            return res.send({success:false,error:{name:'Giriş yapmalısınız!'}}); 
           
        }
        const error = e;
        console.log(e)
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
        const comment = await Comment.findById(req.query.id)
        if(comment.likes.includes(token.id)){
            throw {name:"You have already liked this comment"}
        }
        comment.likes.push(token.id)
        comment.dislikes = comment.dislikes.filter(e=>e !== token.id) // Dislike listesinden çıkarıyor
        await comment.save();
        res.send({success:true, likeCount:comment.likes.length, dislikeCount:comment.dislikes.length})
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
        
        const comment = await Comment.findById(req.query.id)
        if(comment.dislikes.includes(token.id)){
            throw {name:"You have already disliked this comment"}
        }
        comment.dislikes.push(token.id)
        comment.likes = comment.likes.filter(e=>e !== token.id) // like listesinden çıkarıyor
        await comment.save()
        res.send({success:true, likeCount:comment.likes.length, dislikeCount:comment.dislikes.length})
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