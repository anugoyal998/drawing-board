require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const Router = require('./routes/router')
const connect = require('./db/connect')
connect(process.env.MONGODB_URI)
//middleware
app.use(express.json())
app.use(cors())
app.use('/',Router)
app.get('/',(req,res)=> {
    res.send("<h1>Drawing board Server</h1>")
})

//listen app
app.listen(PORT,()=> {
    console.log(`listening app on PORT: ${PORT}`)
})

