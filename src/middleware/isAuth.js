const { verifyAccessToken } = require("../utils/jwt_util")

const isAuth = (req, res, next) => {
    const token = req.cookies.token

    const isUser = verifyAccessToken(token)

    if (isUser) {
        next()
    } else {
        res.status(400).json({ message: 'unauthorized user' })
    }

}

module.exports = isAuth