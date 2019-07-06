import React from 'react'
import axios from 'axios'
import TransactionFrom from './form'

class TransactionNew extends React.Component{
    
    handleSubmit = () => {
        axios.post('http://localhost:3005/show', formData,{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }
            else{
               this.props.history.push(`/show/${response.data._id}`)

            }
        })
    }

    render(){
        return(
            <div>
                <TransactionFrom handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
