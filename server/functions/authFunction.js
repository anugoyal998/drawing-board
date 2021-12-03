const authSch = require('../model/auth')

const authFunction = async (req,res) => {
    try {
        const findData = await authSch.find({email: req.body.email})
        if(findData.length > 0){
            res.status(200).json("already exists")
            return
        }
        const data = new authSch(req.body)
        await data.save()
        res.status(200).json("user added successfully")
    } catch (error) {
        console.log("error in auth",error)
        res.status(400).json("error")
        return
    }
}

module.exports = {
    authFunction
}

