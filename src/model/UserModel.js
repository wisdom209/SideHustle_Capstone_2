const { passwordHasher } = require('../utils/password_harsher');
const { createAccessToken, verifyAccessToken } = require('../utils/jwt_util')
const connection = require('../config/db.config')
const {insertQuery} = require('../database/operations')
require('dotenv').config()

//insert a new user into db
const createUser = async (user) => {
    

    const { first_name, last_name, email, password, phone, address, is_Admin } = user;

    let hashedPassword = await passwordHasher(password)

    let message = await new Promise((resolve, reject) => {
        console.log(hashedPassword)
        connection.query(insertQuery, [first_name, last_name, email, hashedPassword, phone, address, is_Admin], (err, result) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    resolve({
                        'message': 'error',
                        'body': 'email already exists'
                    })
                } else {
                    resolve({
                        'message': 'error',
                        'body': err.sqlMessage
                    })
                }
            } else {
                resolve({
                    'message': 'success',
                    'token': createAccessToken(process.env.JWT_SECRET_KEY, email),
                    'body': {
                        'token': createAccessToken(process.env.JWT_SECRET_KEY, email),
                        'id': result.insertId,
                        first_name, last_name, email
                    }
                })
            }
        }
        )
    })
    return message
}

module.exports = { createUser }


