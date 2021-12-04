const boardSch = require('../model/board')

const createNewBoardFunction = async (req,res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            img: req.body.img,
            gid: req.body.gid,
            uid: Date.now().toString(),
            board_name: 'Untitled Board',
            board_data: req.body.board_data
        }
        const dataToSave = new boardSch(data)
        await dataToSave.save()
        res.status(200).json("success")
    } catch (error) {
        console.log("error creating board function",error)
        res.status(400).json("error")
        return
    }
}

const getBoardFunction = async (req, res) => {
    try {
        const findData = await boardSch.find({email: req.body.email})
        res.status(200).json(findData)
    } catch (error) {
        console.log("error getting board function",error)
        res.status(400).json("error")
        return
    }
}

module.exports = {
    createNewBoardFunction,
    getBoardFunction,
}