const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router()

router.get('/home',authMiddleware,(req,res)=>{
    res.send("hello this is home page , only authorized persons can enter")
})

module.exports = router