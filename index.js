const express = require('express')
const cors = require('cors')

const app = express()
const port = 3005

const {mongoose} = require('./config/database')
const {userRouter} = require('./app/controllers/userController')

app.use(express.json())
app.use(cors())

app.use('/', userRouter)

app.listen(port, () => {
    console.log('listening to the port',port)
})