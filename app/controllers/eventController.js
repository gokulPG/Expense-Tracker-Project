const express = require('express')
const {Event} = require('../models/eventModel') 
const {authenticateUser} = require('../middlewares/authentication')
const router = express.Router()

router.get('/',authenticateUser,(req,res) => {
    const {user} = req
    Event.find({
        user: user._id
    })
      .then(event => {
            res.send(event)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:id', authenticateUser, (req,res) => {
    const {user} = req
    const id = req.params.id

    Event.findOne({
        _id: id,
        user: user._id
    })
    // .populate('Transaction')
    .then(event =>{
            if(!event)   {
                res.send({})
            }
            res.send(event)
        })
        .catch(err =>{
            res.send(err)
        })
})

router.post('/', authenticateUser, (req,res) => {
    const {user} = req
    const body = req.body
    const event = new Event(body)
    event.user = user._id
    event.save()
        .then(event => {
            res.send(event)
        })
        .catch(err => {
            res.send(err)
        })      
})

router.delete('/:id', authenticateUser, (req,res) =>{
    const {user} = req
    const id = req.params.id
    Event.findByIdAndDelete({
        _id:id,
        user:user._id
    })
    .then(event =>{
        if(!event)   {
            res.send({})
        }
        res.send(event)
    })
    .catch(err =>{
        res.send(err)
    })
} )
module.exports = {
    eventRouter : router
}