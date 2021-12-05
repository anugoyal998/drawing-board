const boardSch = require('../model/board')

const renameBoardFunction = async (req,res) => {
    try {
        const findData = await boardSch.find({uid: req.body.uid})
        if(findData.length <= 0){
            res.status(400).json("an error occured")
            return
        }
        await boardSch.updateOne({_id: findData[0]._id},{
            $set: {
                board_name: req.body.new_board_name
            }
        })
        res.status(200).json("success")
    } catch (error) {
        console.log("error in renameBoardFunction",error)
        res.status(400).json("error")
        return
    }
}

const deleteBoardFunction = async (req, res) => {
    try {
        await boardSch.deleteOne({_id: req.body._id})
        res.status(200).json("success")
    } catch (error) {
        console.log("error in deleteBoardFunction",error)
        res.status(400).json("error")
        return
    }
}

module.exports = {
    renameBoardFunction,
    deleteBoardFunction,
}