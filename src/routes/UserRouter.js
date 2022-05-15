const express = require('express')
const { signup_post } = require('../controller/UserController')
const isValidDetails = require('../middleware/validator')

const router = express.Router()

router.use('/auth/signup', isValidDetails);

router.post('/auth/signup', signup_post)

module.exports = router;
