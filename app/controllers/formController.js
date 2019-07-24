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

router.get('/budget', authenticateUser, (req,res) => {
    const {user} = req
    
    Budget.find({
        user: user._id
    })
    .then(budgets => {
            const arr = []
            const promiseArr = []
            const i = 1
            function transactionFind(budget){
               return Transaction.find({
                            user:user._id,
                            isExpense: true,
                            category: budget.category
                        })
                    }

            budgets.forEach(function(budget){  
                 promiseArr.push(transactionFind(budget)) 
            })

            Promise.all([...promiseArr])
                .then(transactions => {
                    let expense = 0
                  
                    // while(i){
                    //     transactions[i-1].forEach(function(transaction){
                    //         expense = expense+ transaction.amount
                    //     })
                    //     ++i
                    // }
                    // var formData = {
                    //     category: budget.category,
                    //     amount: budget.amount,
                    //     expense: expense,
                    //     spent: budget.amount - expense
                    // }
                    // arr.push(formData) 
                    // console.log('arr', arr)
                    res.json(transactions)
            })
       
        
    })
    .catch(err =>{
        res.send(err)
    })

})



module.exports = {
    formRouter : router
}