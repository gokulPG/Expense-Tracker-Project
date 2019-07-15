const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReminderSchema = new Schema({
    name:{
        type:String,
        default:true

    },
    amount:{
        type:Number
        

    },
    dueDate:{
        type:Date,
        default:Date.now()

    },
    isPaid:{
        type: Boolean,
        default: false

    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    new:{
        type:String
    }
})

const Reminder = mongoose.model('Reminder', ReminderSchema)

module.exports = {
    Reminder
}