const bcrypt = require('bcrypt');
const crypto = require('crypto');

const errors = require('./errors');
require('dotenv').config();
let User = require('../models/user.model');
const {createTokens} = require('../controllers/jwt');
const {sentEmail} = require('../controllers/emailVerification');

function encrypt(text){
    
    var algorithm = 'aes256';
    var inputEncoding = 'utf8';
    var outputEncoding = 'hex';
    var ivlength = 16  

    var key = Buffer.from(process.env.CRYPTO_KEY, 'latin1'); 
    var iv = crypto.randomBytes(ivlength);

    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var ciphered = cipher.update(text, inputEncoding, outputEncoding);
    ciphered += cipher.final(outputEncoding);
    var ciphertext = iv.toString(outputEncoding) + ':' + ciphered
    return ciphertext;
  }
  
function decrypt(ciphertext){
    var algorithm = 'aes256';
    var inputEncoding = 'utf8';
    var outputEncoding = 'hex';
    var ivlength = 16  

    var key = Buffer.from(process.env.CRYPTO_KEY, 'latin1'); 
    var iv = crypto.randomBytes(ivlength);

    var components = ciphertext.split(':');
    var iv_from_ciphertext = Buffer.from(components.shift(), outputEncoding);
    var decipher = crypto.createDecipheriv(algorithm, key, iv_from_ciphertext);
    var deciphered = decipher.update(components.join(':'), outputEncoding, inputEncoding);
    deciphered += decipher.final(inputEncoding);
    return deciphered;
  }


function isEmailValid(email) {
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

const register = async(email, unhashed) =>{
    try{
        if(!isEmailValid(email)){ return {success: false, error: "INVALID EMAIL"}}
        if(unhashed.length>40 || unhashed.length<14){return {success: false, error: "PASSWORD LENGTH MUST BE BETWEEN 14 to 40 CHARACTERS"}}
        const hash = await bcrypt.hash(unhashed, 10)

        const password = hash;
        const newUser = new User({ email, password});
        const user = await newUser.save();
        sentEmail(user.email)
        return {success: true};    
    }
    catch(err){
        console.log(err);
        return {success: false, error:  "THIS EMAIL ALREADY USED"};
    }
};

const login = async (_email, password) =>{
    try{
        const user = await User.findOne( {email: _email});
        if(!user){
            return {valid: 0 , error: errors.ERRORS.EMAIL_NOT_FOUND};
        }
        /*if(!user.isValidated){
            return {valid: 0 , error: "EMAIL IS NOT CONFIRMED"};
        }*/
        else{
            const dbPassword = user.password; 
            const match = await bcrypt.compare(password, dbPassword)
            
            if(!match){ return {valid : 0, error: errors.ERRORS.WRONG_PASSWORD_OR_USERNAME}}

            else{    
                const accessToken = await createTokens(user.id);
                return {valid: 1, access : accessToken};
            }

        
        
    };}
    catch(err){ 
        console.log(err);
        return {valid : 0, error : "Mongoose Error"};}
};

const changePassword = async(userID, oldPass, newPass) => {
    if(newPass.length>40 || newPass.length<14){return {success: false, error: "NEW PASSWORD LENGTH MUST BE BETWEEN 14 to 40 CHARACTERS"}}
    const user = await User.findOne( {_id: userID});
    const dbPassword = user.password; 
    const match = await bcrypt.compare(oldPass, dbPassword)
            
    if(!match){ return {valid : 0, error: "WRONG PASSWORD"}}
    else{
        const hash = await bcrypt.hash(newPass, 10);
        const log = await User.updateOne({_id: userID}, { password : hash });
        return {valid: 1, response : "PASSWORD CHANGED SUCCESSFULLY"};
    }
}

const changeEmail = async(userID, pass, newEmail) => {
    if(!isEmailValid(newEmail)){ return {success: false, error: "INVALID EMAIL"}}
    const user = await User.findOne( {_id: userID});
    const dbPassword = user.password; 
    const match = await bcrypt.compare(pass, dbPassword)
            
    if(!match){ return {success : false, error: "WRONG PASSWORD"}}
    else{
        const log = await User.updateOne({_id: userID}, { email : newEmail });
        return {success: true, response : "EMAIL CHANGED SUCCESSFULLY"};
    }
}

module.exports = { register, login, changePassword, changeEmail}