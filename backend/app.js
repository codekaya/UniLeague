const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");      
require('dotenv').config();
const {isValidated} = require("./controllers/jwt");
let User = require('./models/user.model');
const {sign, verify} = require('jsonwebtoken');



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => { console.log('Database connection established succesfully')});

const userRouter = require('./routes/users');
const universityRouter = require('./routes/universities')
app.use('/api/', userRouter);
app.use('/api/university',universityRouter);

app.listen(port, () => { console.log(`Server is running on port : ${port}`)});


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "UniLeague",
            version: "1.0.0"
        },},
        apis: ['app.js'],
    };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

 //console.log(swaggerDocs);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * 
 * /api/register
 * /api/login
 * /api/profile
 * /
 * /api/changePassword
 * /api/changeEmail
 * /api/logout
 * /api/university/rate
 * @swagger
 * /api/profile:
 *    get:
 *       summary: Get Profile.
 *       tags : ['Account']
 *       description: Get Profile
 *       responses:
 *          200:
 *            description: Success
 * @swagger
 *      /api:
 *          get:
 *              summary: Get User object.
 *              tags : ['Account']
 *              description: Get User
 *              responses:
 *                  200:
 *                      description: Success
*/

/**
 * @swagger
 *      /api/logout:
 *          get:
 *              summary: Logout user.
 *              tags : ['Account']
 *              description: Logout User
 *              responses:
 *                  200:
 *                      description: Success
 */
/**
 * @swagger
 * /api/register:
 *   post:
 *     tags : ['Account']
 *     summary: Creates a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 */
/**
 * @swagger
 * /api/show_comments:
 *      
 *   get:
 *     tags : ['Account']
 *     summary: Show user comments.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: User Id
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request   
 */
/**
/**
 * @swagger
 * /api/university/rate:
 *      
 *   post:
 *     tags : ['University']
 *     summary: Rate university.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: University Id
 *         type: string
 *       - in: body
 *         name: Rates
 *         description: Rates of user
 *         schema:
 *           type: object
 *           required:
 *             - edu_point
 *             - dorm_point
 *             - trans_point
 *             - campus_point
 *           properties:
 *             edu_point:
 *               type: number
 *             dorm_point:
 *               type: number
 *             trans_point:
 *               type: number
 *             campus_point:
 *               type: number
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request   
 */
/**
 * @swagger
 * /api/university/new_comment:
 *   post:
 *     tags:
 *       - University
 *     summary: Create a new comment
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: University Id
 *         type: string
 *       - in: body
 *         name: Comment
 *         description: Post New Comment
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - content
 *           properties:
 *             username:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
/**
 * @swagger
 * /api/university/like_comment:
 *   post:
 *     tags:
 *       - University
 *     summary: Like comment
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Comment Id
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
/**
 * /**
 * @swagger
 * /api/university/dislike_comment:
 *   post:
 *     tags:
 *       - University
 *     summary: Dislike comment
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Comment Id
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
/**
 * @swagger
 * /api/university/show_comments:
 *      
 *   get:
 *     tags : ['University']
 *     summary: Show university comments.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: University Id
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request   
 */
/**
/**
 * @swagger
 * /api/university/delete_comment:
 *      
 *   post:
 *     tags : ['University']
 *     summary: Delete university comment.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: Comment Id
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request   
 */
/**
 * @swagger
 * /api/university:
 *      
 *   get:
 *     tags : ['University']
 *     summary: Get university.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         description: University Id
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request   
 */
/**
 * @swagger
 * /api/changePassword:
 *   post:
 *     tags : ['SetInfo']
 *     summary: Change Password.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: changes password.
 *         schema:
 *           type: object
 *           required:
 *             - oldPassword
 *           properties:
 *             oldPassword:
 *               type: string
 *             newPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     tags : ['Account']
 *     summary: User Login.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User Login.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/changeEmail:
 *   post:
 *     tags : ['SetInfo']
 *     summary: Email Change.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: changes user email.
 *         schema:
 *           type: object
 *           required:
 *             - newEmail
 *           properties:
 *             password:
 *               type: string
 *             newEmail:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/emailVerify:
 *   post:
 *     tags : ['Account']
 *     summary: email verification .
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: "email ve emaile gonderilen accessCode "
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *             accessCode:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/getEmailCode:
 *   post:
 *     tags : ['Account']
 *     summary: sents email verification code to the given email address.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: " email verification code "
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/resetPassword:
 *   post:
 *     tags : ['Account']
 *     summary: reset password.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: "Takes email, email verification code and new password to reset Password"
 *         schema:
 *           type: object
 *           required:
 *             - newPassword
 *           properties:
 *             email:
 *               type: string
 *             emailCode:
 *               type: string
 *             newPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 */


/*********************************************************** */
