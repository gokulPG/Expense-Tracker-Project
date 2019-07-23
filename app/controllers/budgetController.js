const express = require('express')
const {Budget} = require('../models/budgetModel')
const {authenticateUser} = require('../middlewares/authentication')
const router = express.Router()

router.get('/',authenticateUser,(req,res) => {
    const {user} = req
    Budget.find({
        user: user._id
    })
      .then(Budget => {
            res.send(Budget)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req,res) => {
    const {user} = req
    const body = req.body
    const budget = new Budget(body)
    budget.user = user._id
    budget.save()
        .then(Budget => {
            res.send(Budget)
        })
        .catch(err => {
            res.send(err)
        })       
})

router.delete('/:id', authenticateUser, (req,res) =>{
    const {user} = req
    const id = req.params.id
    Budget.findOneAndDelete({
        _id:id,
        user:user._id
    })
    .then(budget =>{
        if(!budget)   {
            res.send({})
        }
        res.send(budget)
    })
    .catch(err =>{
        res.send(err)
    })
} )
module.exports = {
    budgetRouter : router
}
