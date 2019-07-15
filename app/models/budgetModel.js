const mongoose = require('mongoose')


const Schema = mongoose.Schema

const BudgetSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    budget:{
        type: Number,
        required: true
    },
    spent:{
        type: Number,
    },
    left:{
        type: Number
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}) 

const Budget = mongoose.model('Budget', BudgetSchema)

module.exports = {
    Budget
}

