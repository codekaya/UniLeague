const {sign, verify} = require('jsonwebtoken');
require("dotenv").config();



const createTokens = (id) => {
    const accessToken = sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    } );
    return accessToken;
}



const isValidated = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if(!accessToken) return res.status(400).json({error: "User not Authenticated"});

    try{
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if(validToken){
            req.authenticated = true;
            return next()
        }
    }
    catch(err){
        res.status(400).json({ error: err});
    }
}

module.exports = {createTokens, isValidated};