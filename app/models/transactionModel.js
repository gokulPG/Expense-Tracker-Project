const mongoose = require('mongoose')
// const Category = require('')
// const User = require('')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    amount:{
        type: Number,
        required: true,

    },
    description:{
        type: String

    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category'

    },
    date:{
        type:Date,
        default:Date.now()

    },
    bill:{
        type: String

    },
    isExpense:{
        type:Boolean,
        default: false

    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User'

    }

})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = {
     Transaction
}