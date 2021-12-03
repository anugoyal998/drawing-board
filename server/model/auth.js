const mongoose = require('mongoose')

const sch = new mongoose.Schema({
    name: 'string',
    email: 'string',
    img: 'string',
    gid: 'string',
})

const model = new mongoose.model('user',sch)
module.exports = model