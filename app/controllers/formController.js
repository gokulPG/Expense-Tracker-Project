const express = require('express')
const {Transaction} = require('../models/transactionModel')
const {authenticateUser} = require('../middlewares/authentication')
const router = express.Router()

router.get('/', authenticateUser, (req,res) => {
    const {user} = req

    Promise.all([Transaction.find({
        user:user._id,
        isExpense: true
    }), Transaction.find({
        user:user._id,
        isExpense: false
    })])
    .then(transaction =>{
            let expenseAmount = 0
            let incomeAmount = 0
        
            transaction[0].forEach(function(expense){
                    expenseAmount = expenseAmount + expense.amount
                })
            transaction[1].forEach(function(income){
                    incomeAmount = incomeAmount + income.amount 
                })
                    res.json({
                        expense: expenseAmount,
                        income:  incomeAmount
                    })
      })
      .catch(err =>{
          res.send(err)
      })
})




module.exports = {
    formRouter : router
}