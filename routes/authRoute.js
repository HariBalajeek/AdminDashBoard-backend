const express = require('express');
const { signup, login } = require('../controllers/authController');


//router
const router = express.Router()


//methods of route
router.post('/signup',signup)
router.post('/signin',login)

//exporting the router
module.exports = router;