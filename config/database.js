const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/expense-tracker',{useNewUrlParser:true})
        .then(() => {
            console.log("connected to the database")
        })
        .catch((err) => {
            console.log("error connecting to the database", err)
        })

module.exports = {mongoose}