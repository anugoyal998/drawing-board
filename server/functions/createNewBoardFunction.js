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

const updateBoardFunction = async (req, res) => {
    try {
        const findData = await boardSch.find({uid: req.body.uid})
        if(findData.length <= 0){
            res.status(400).json("an error occured")
            return
        }
        await boardSch.updateOne({_id: findData[0]._id},{
            $set: {
                board_data: req.body.board_data
            }
        })
        res.status(200).json("success")
    } catch (error) {
        console.log("error in updateBoardFunction",error)
        res.status(400).json("error")
        return
    }
}

module.exports = {
    createNewBoardFunction,
    getBoardFunction,
    updateBoardFunction,
}