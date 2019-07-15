const express = require('express')
const cors = require('cors')

const app = express()
const port = 3005

const {mongoose} = require('./config/database')
const {userRouter} = require('./app/controllers/userController')
const {transactionRouter} = require('./app/controllers/transactionController')
const {categoryRouter} = require('./app/controllers/categoryController')
const {budgetRouter} = require('./app/controllers/budgetController')
const {eventRouter} = require('./app/controllers/eventController')

app.use(express.json())
app.use(cors())

app.use('/', userRouter)
app.use('/transactions', transactionRouter)
app.use('/categories', categoryRouter)
app.use('/budget', budgetRouter)
app.use('/event', eventRouter)


app.listen(port, () => {
    console.log('listening to the port: ',port)
})