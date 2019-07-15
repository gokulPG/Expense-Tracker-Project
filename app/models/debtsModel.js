const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DebtsSchema = new Schema({
    name:{
        type:String,
        default: true

    },
    amount:{
        type:Number

    },
    isBorrowing:{
        type:Boolean,
        default: false

    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'

    }
})

const Debts = mongoose.model('Debts', DebtsSchema)

module.exports = {
    Debts
}