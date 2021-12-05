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
//get board from db
const {createNewBoardFunction, getBoardFunction} = require('../functions/createNewBoardFunction');
router.post('/new-board',createNewBoardFunction)
router.post('/get-board',getBoardFunction)

//update board
const { renameBoardFunction, deleteBoardFunction } = require('../functions/updateBoard');
router.post('/rename-board',renameBoardFunction)
router.post('/delete-board',deleteBoardFunction)




module.exports = router

