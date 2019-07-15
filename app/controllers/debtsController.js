const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')
const {Debts} = require('../models/debtsModel')

const n


router.get('/', authenticateUser, (req,res) => {
    const {user} = req
    Debts.find({user:user._id})
     .then(debts => {
         res.json(debts)
     })
     .catch(err => {
         res.json(err)
     })
})


router.get('/:id', authenticateUser, (req,res) => {
    const id = req.params.id
    const {user} = req
    Debts.findOne({
        _id:id,
        user:user._id
    })
    .then(debts => {
        res.json(debts)
    })
    .catch(err => {
        res.json(err)
    })
})

router.post('/', authenticateUser, (req,res) => {
    const body = req.body
    const {user} = req
    const debts = new Debts(body)
    debts.user=user._id
    debts.save()
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
    debtsRouter : router
}