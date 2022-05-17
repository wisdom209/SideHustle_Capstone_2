const jwt = require('jsonwebtoken')

const createAccessToken = (secretCode, id, email) =>{
    return jwt.sign({id, email}, secretCode, {expiresIn: 172800});
}

const verifyAccessToken = (token, secretCode) =>{
    return jwt.verify(token,secretCode);
}

const decodedJwt= (token)=>jwt.decode(token)

module.exports = {createAccessToken, verifyAccessToken, decodedJwt}