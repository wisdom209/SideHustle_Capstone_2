const { passwordHasher } = require('../utils/password_harsher');
const {insertQuery, findUserQuery} = require('../database/operations')
const { createAccessToken } = require('../utils/jwt_util')
const connection = require('../config/db.config');
const { isPasswordSameAsHash } = require('../utils/password_compare');
require('dotenv').config()

//sign in a new user into db
const findUser = async ({ email, password }) => {
    
    let message = await new Promise((resolve, reject) => {
        connection.query(findUserQuery, [email], (err, result) => {
            if (err) throw err;
            console.log("res", result)

            if (err) {
                resolve({ 'result': 'something went wrong', 'body': err.sqlMessage, 'status': 'error' })
            } else if (result.length == 0) {
                resolve({ 'body': 'not registered', 'status': 'error' })
            } else {
                console.log(result[0])
                resolve({ body: result[0], 'statusMessage': 200 })
            }

        })
    })



    if (message.body == 'not registered') {
        return { 'body': 'not registered', 'status': 'error' }
    } else {
        console.log('p:', password, message.body.password)
        let comparePassword = await isPasswordSameAsHash(password, message.body.password);

        if (comparePassword) {
            let token = createAccessToken(process.env.JWT_SECRET_KEY, email);
            
            return { 'status': 'succcess', 'body': { token, "id": message.body.id, "first_name": message.body.first_name, "last_name": message.body.last_name, email } };
        } else {
            return { 'body': 'password is incorrect', 'status': 'error' }
        }

    }

}

//insert a new user into db
const createUser = async (user) => {
    

    const { first_name, last_name, email, password, phone, address, is_Admin } = user;

    let hashedPassword = await passwordHasher(password)

    let message = await new Promise((resolve, reject) => {
        
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

module.exports = { createUser, findUser }


