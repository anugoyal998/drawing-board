const express = require('express');
const router = new express.Router();


// test end point
router.get('/hello',(req, res) => { 
    res.send("helo")
})

//auth
const {authFunction} = require('../functions/authFunction')
router.post('/auth/add/user',authFunction)

//createNewBoard
const {createNewBoardFunction} = require('../functions/createNewBoardFunction')
router.post('/new-board',createNewBoardFunction)


module.exports = router

