const express = require('express')
const { signup_post, signin_post } = require('../controller/UserController')
const isValidDetails = require('../middleware/validator')
const isAuth = require('../middleware/isAuth')

const { postPropertyAdvert, markAdvertSold, deleteProperty, viewProperties ,viewType, viewSpecificAdvert,updatePropertyAdvert} = require('../controller/property_controller')

const router = express.Router()

router.use('/auth/signup', isValidDetails);

router.post('/auth/signin', signin_post)

router.post('/auth/signup', signup_post)

router.get("/property/search?", viewType)

router.get('/property/:id', viewSpecificAdvert )

router.get('/property', viewProperties)


//protected routes

router.use(isAuth)

router.post('/property', postPropertyAdvert)

router.patch('/property/:id', updatePropertyAdvert )

router.patch('/property/:id/sold', markAdvertSold)

router.delete('/property/:id', deleteProperty)

module.exports = router;
