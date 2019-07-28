import React from 'react'
import ReminderForm from './reminder'
import axios from 'axios'

class AddReminder extends React.Component{
   
    handleSubmit = (formData) => {
        console.log(formData)
        axios.post('http://localhost:3005/reminder', formData,{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }
            else{
                
                // this.props.history.push(`/remShow/${response.data._id}`)
                this.props.history.push(`/remind`)
    
            }
        })
    }

    render(){
        return(
            <div>
                <ReminderForm handleSubmit={this.handleSubmit}/>
                {/* <button onClick={this.handleClick}>add reminders</button> */}

            </div>
        )
    }
}

export default AddReminder