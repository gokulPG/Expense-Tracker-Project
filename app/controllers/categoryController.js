const express = require('express')
const router = express.Router()

const {Category} = require('../models/categoryModel')

router.get('/',(req,res) => {
 
    Category.find()
        .then(category =>{
            res.json(category)
        })
        .catch(err =>{
            res.json(err)
        })
})


// router.get('/:id', authenticateUser, (req,res) =>{
//     const id = req.params.id
//     const {user} = req
//     Category.findOne({
//         _id:id,
//         user:user._id
//     })
//     .then(category => {
//         res.json(category)
//     })
//     .catch(err =>{
//         res.json(err)
//     })
// })


router.post('/',(req,res) =>{
    const body = req.body
  
    const category = new Category(body)
  
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


router.delete('/:id', (req,res) =>{
    const id = req.params.id
    
    Category.findByIdAndDelete({_id:id})
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