const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')
const {Reminder} = require('../models/reminderModel')


router.get('/', authenticateUser, (req,res) =>{
    const {user} = req
    Reminder.find({user:user._id})
     .then(reminder => {
         res.json(reminder)
     })
     .catch(err => {
         res.json(err)
     })
})

router.get('/:id', authenticateUser, (req,res) =>{
    const id = req.params.id
    const {user} = req
    Reminder.findOne({
        _id:id,
        user:user._id
    })
    .then(reminder => {
        res.json(reminder)
    })
    .catch(err => {
        res.json(err)
    })
})


router.post('/', authenticateUser, (req,res) => {
    const body = req.body
    const {user} = req
    const reminder = new Reminder(body)
    reminder.user = user._id
    reminder.save()
    .then(reminder => {
        if(!reminder){
            res.json({})
        }
        res.json(reminder)
    })
    .catch(err => {
        res.json(err)
    })
})

router.delete('/:id', authenticateUser, (req,res) => {
    const id = req.params.id
    const {user} = req
    Debts.findByIdAndDelete({
        _id:id,
        user:user._id
    })
    .then(debts => {
        if(!debts){
            res.json({})
        }
        res.json(debts)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = {
    reminderRouter : router
}