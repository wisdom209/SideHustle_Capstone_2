const { verifyAccessToken } = require("../utils/jwt_util")

const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    
    let isUser = null;

    try {
       isUser =  verifyAccessToken(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        console.log(error)
    }

    if (isUser) {
        next()
    } else {
        res.status(400).json({'status': 'error', 'error-message': 'unauthorized user' })
    }

}

module.exports = isAuth