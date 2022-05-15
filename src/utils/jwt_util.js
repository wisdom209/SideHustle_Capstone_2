const jwt = require('jsonwebtoken')

const createAccessToken = (secretCode, email) =>{
    return jwt.sign({email}, secretCode, {expiresIn: 172800});
}

const verifyAccessToken = (token, secretCode) =>{
    return jwt.verify(token,secretCode);
}

module.exports = {createAccessToken, verifyAccessToken}