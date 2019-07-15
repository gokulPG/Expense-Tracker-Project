const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    days:{
        type: Number
    },
    transaction:{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Event = mongoose.model('Event', EventSchema)

module.exports = {
    Event
}