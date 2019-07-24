const express = require('express')
const {Transaction} = require('../models/transactionModel')
const {authenticateUser} = require('../middlewares/authentication')
const router = express.Router()

router.get('/', authenticateUser, (req,res) => {
    const {user} = req
    Transaction.find({
        user:user._id,

    }).populate('category',['name'])
      .then(transaction =>{
          res.send(transaction)
      })
      .catch(err =>{
          res.send(err)
      })
})


router.get('/:id', authenticateUser, (req,res) =>{
    const id = req.params.id
    const {user} = req
    // const date = req.query.date
    // const result = date
    Transaction.findOne({
        _id : id,
        user : user._id,
        // date: result
    }).populate('category',['name'])
    .then(transaction =>{
        if(!transaction){
            res.send({})
        }
        res.send(transaction)
    })
    .catch(err =>{
        res.send(err)
    })
})

router.post('/', authenticateUser, (req,res) =>{
    const {user} = req
    const body = req.body
    const transaction = new Transaction(body)
    transaction.user = user._id     
    transaction.save()
    .then(transaction =>{
        res.send(transaction)
    })
    .catch(err =>{
        res.send(err)
    })

})


router.delete('/:id', authenticateUser, (req,res) =>{
    const {user} = req
    const id = req.params.id
    Transaction.findByIdAndDelete({
        _id:id,
        user:user._id
    })
    .then(transaction =>{
        if(!transaction)   {
            res.send({})
        }
        res.send(transaction)
    })
    .catch(err =>{
        res.send(err)
    })
} )


module.exports = {
    transactionRouter : router
}