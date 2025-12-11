const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/reactO'
const cors=require('cors')
const app = express()

const port = 8050
app.use(cors())

    app.use(express.json());
mongoose.connect(url)
    .then(() => { console.log("connection is successful") })
    .catch((err) => { console.log("database is not connecting", err )})


const userRouter = require('./Router/userrouter')
app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`server is running yas on ${port}`)
})
