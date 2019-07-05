const mongoose = require('mongoose')
// const User = require('./user')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:{
        type:String,
        default:true
        

    },
    isExpense:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default: Date.now()

    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Category = mongoose.model('Category', CategorySchema)

module.exports = {
    Category
}