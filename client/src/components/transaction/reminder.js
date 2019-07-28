import React from 'react'
import Calender from 'react-calendar'
import {Link} from 'react-router-dom'


class ReminderForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            amount:'',
            date: new Date(),
            recurring:false,
            onetime:false

        }
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))

    }

    onChange = (date) => {
       this.setState({date})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            amount: this.state.amount,
            date: this.state.date
        }

      this.props.handleSubmit(formData)

        }
    
    

    

    

    handleCancelClick = () => {
        this.setState(() => ({
            name:'',
            amount:'',
            date:''

        }))
    }

    handlerecurringChange = () =>{
        this.setState((prevState) => ({
            recurring : !prevState.recurring
     }))
    }
    
    handleoneChange = () => {
        this.setState((prevState) => ({
            onetime: !prevState.onetime
        }))
    }

    

    render(){
        return(
            <div className="card center p-3 mb-2 bg-secondary text-white nav nav-pills nac-stacked anyClass">
                <form onSubmit={this.handleSubmit}>
                <label>
                    Bill Name
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange}/>
                </label><br/>
                <label>
                    Amount
                    <input type="text" value={this.state.amount} name="amount" onChange={this.handleChange}/>
                </label><br/>
                <label>
                    recurring
                    {this.state.recurring &&  "days"}
                    <input type="checkbox" value={this.state.recurring} onChange={this.handlerecurringChange}/>
                </label><br/>
                <label>
                    one-time
                    {this.state.onetime && <Calender onChange={this.onChange}/>}
                    <input type="checkbox" value={this.state.onetime} onChange={this.handleoneChange}/>
                </label><br/>

                {/* <Calender onChange={this.onChange}/> <br/> */}
                <input type="submit"/>
                <button onClick={this.handleCancelClick}>Cancel</button>
                

                <Link to="/remind"><button>back</button></Link>

                </form>
            </div>
        )
    }
}

export default ReminderForm