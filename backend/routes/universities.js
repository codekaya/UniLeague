const router = require('express').Router();
let University = require('../models/university.model');
const {isValidated} = require('../controllers/jwt')
const {sign, verify} = require('jsonwebtoken');


router.route('/rate').post(async (req,res)=>{
    try {
        const accessToken = req.cookies["access-token"];
        const token = verify(accessToken , process.env.JWT_SECRET);
        //Kullanıcının daha önce ratelememiş olması kontrol edilmeli
        //const user = await User.findOne( {_id: token.id});
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
    } catch (e) {
        const error = e;
        res.send({success: false, error: error }).status(400)   
    }
})

module.exports = router;