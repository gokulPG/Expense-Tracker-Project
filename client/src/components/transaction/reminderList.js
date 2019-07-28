import React from 'react'
import axios from 'axios'

class ReminderList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            reminders:[]
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3005/reminder',{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            console.log(response.data)
            this.setState(() => ({
                reminders: response.data
            }))

        })
           
    }

    handleDelete(rem){
        const confirmRemove=window.confirm('are you sure?')
        if(confirmRemove){
            axios.delete(`http://localhost:3005/reminder/${rem._id}`,{
                headers:{
                    'x-auth': localStorage.getItem('userAuthToken')
                }
            })
            .then(()=> {
                this.setState((prevState) => ({
                    reminders: prevState.reminders.filter(item => item._id !== rem._id)
                })
                
            )})
        }}

    render(){
        return(
            <div  className="card" >
                <ul className="list-group list-group-flush center">
               
                    {
                        this.state.reminders.map((reminder) => {
                            return <li className="list-group-item " key={reminder._id}>{reminder.name}-{reminder.amount}
                            <button onClick={()=>{this.handleDelete(reminder)}}>X</button></li>
                        })
                    }
                </ul>
               

            </div>
        )
    }
}

export default ReminderList