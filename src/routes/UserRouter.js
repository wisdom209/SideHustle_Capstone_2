const express = require('express')
const { signup_post, signin_post } = require('../controller/UserController')
const isValidDetails = require('../middleware/validator')

const router = express.Router()

router.post('/auth/signin', signin_post)

router.use('/auth/signup', isValidDetails);

router.post('/auth/signup', signup_post)

module.exports = router;