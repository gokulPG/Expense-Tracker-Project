const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:4
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validate:{
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'invalid email entered, please check and correct'
            }
        }
    },
    password:{
        type: String,
        minlength:6,
        maxlength:60,
        unique:true
    },
    tokens:[
        {
            token:{
                type: String,
            },
            createdAt:{
                type: Date,
                default: Date.now
            }
        }
    ]
})

//pre save hooks
UserSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                        .then(encryptedPassword => {
                            user.password = encryptedPassword
                            next()
                        })
            })
    }else{
        next()
    }
})

//static method

UserSchema.statics.findByCredentials=function(email, password)
{
    const User=this
    return User.findOne({email})
    .then(function(user){
        if(!user){
            return Promise.reject({errors:'invalid email / password'})
        }
        return bcryptjs.compare(password,user.password)
        .then(function(result){
            if(result){
                return Promise.resolve(user)
            } else {
                return Promise.reject({errors:'invalid email / password'})
            }
        })

    })
    .catch(function(err){
        return Promise.reject(err) //short hand 
        //return new Promise(function(resolve, reject){
        //reject(err)
    //})
    })
}

UserSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        createdAt: Number( new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({ token })    
    return user.save()
            .then(user => {
                return Promise.resolve(token)
            })
            .catch(err => {
                return Promise.reject(err)
            })
}

UserSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@123') // to get the user info
    } catch (error) {
        return Promise.reject(error)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token' : token 
    })
}

const User = mongoose.model('User', UserSchema)

module.exports = User