const express = require('express')
const {Transaction} = require('../models/transactionModel')
const {Budget} =  require('../models/budgetModel')
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

router.get('/result', authenticateUser, (req,res) => {
    const {user} = req
    
    Budget.find({
        user: user._id
    })
    .then(budgets => {
            var arr = []
           
            budgets.forEach(function(budget){
            Transaction.find({
                user:user._id,
                isExpense: true,
                category: budget.category
            })
            .then(transactions => {

                var expense = 0
                transactions.forEach(function(transaction){
                    expense = expense+ transaction.amount
                })
                var formData = {
                    category: budget.category,
                    amount: budget.amount,
                    expense: expense,
                    spent: budget.amount - expense
                }
                arr.push(formData) 
                console.log(arr)
            })
            
            // res.json(arr)
        })
       
        
    })
    .catch(err =>{
        res.send(err)
    })

})



module.exports = {
    formRouter : router
}