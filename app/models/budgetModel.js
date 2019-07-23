const mongoose = require('mongoose')


const Schema = mongoose.Schema

const BudgetSchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref: 'Category'
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

