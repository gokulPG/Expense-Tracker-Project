import React from 'react'
import axios from 'axios'
import BudgetForm from './budgetForm'

class BudgetNew extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            categories:[]
        }
    }

    handleSubmit = (formData) =>{
        axios.post('http://localhost:3005/budget',formData,{
            headers: {
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                this.props.history.push('/users/budgetList')
            }
        })
   }

   render(){
       return(
           <div>
               <BudgetForm handleSubmit={this.handleSubmit} />
           </div>
       )
   }
}

export default BudgetNew