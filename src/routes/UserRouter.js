const express = require('express')
const { signup_post, signin_post } = require('../controller/UserController')
const isValidDetails = require('../middleware/validator')
const { postPropertyAdvert, markAdvertSold, deleteProperty, viewProperties ,viewType} = require('../controller/property_controller')

const router = express.Router()

router.post('/auth/signin', signin_post)

router.use('/auth/signup', isValidDetails);

router.post('/auth/signup', signup_post)

router.post('/property', postPropertyAdvert )

router.put('/property/:id/sold', markAdvertSold )

router.delete('/property/:id', deleteProperty )

router.get('/property', viewProperties )

router.get("/property/search?", viewType )

module.exports = router;
