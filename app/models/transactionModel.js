const mongoose = require('mongoose')
// const Category = require('')
// const User = require('')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    amount:{
        type: Number
    },
    description:{
        type: String

    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category'

    },
    event:{
        type:Schema.Types.ObjectId,
        ref: 'Event'

    },
    isEvent:{
        type:Boolean,
        default:false

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