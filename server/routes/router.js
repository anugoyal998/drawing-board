const express = require('express');
const router = new express.Router();


// test end point
router.get('/hello',(req, res) => { 
    res.send("helo")
})

//auth
const {authFunction} = require('../functions/authFunction')
router.post('/auth/add/user',authFunction)


module.exports = router

