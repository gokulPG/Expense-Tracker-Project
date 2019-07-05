const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')
const {Category} = require('../models/categoryModel')

router.get('/', authenticateUser, (req,res) => {
    const {user} = req
    Category.find({user:user._id})
        .then(category =>{
            res.json(category)
        })
        .catch(err =>{
            res.json(err)
        })
})


router.get('/:id', authenticateUser, (req,res) =>{
    const id = req.params.id
    const {user} = req
    Category.findOne({
        _id:id,
        user:user._id
    })
    .then(category => {
        res.json(category)
    })
    .catch(err =>{
        res.json(err)
    })
})


router.post('/', authenticateUser, (req,res) =>{
    const body = req.body
    const {user} = req
    const category = new Category(body)
    category.user = user._id
    category.save()
       .then(category =>{
           if(!category){
               res.json({})
           }
           res.json(category)
       })
       .catch(err =>{
           res.json(err)
       })
})


router.delete('/:id', authenticateUser, (req,res) =>{
    const id = req.params.id
    const {user} = req
    Category.findByIdAndDelete({
        _id:id,
        user:user._id
    })
    .then(category => {
        if(!category){
            res.json({})
        }
        res.json(category)
    })
    .catch(err =>{
        res.json(err)
    })
})

module.exports = {
    categoryRouter : router
}