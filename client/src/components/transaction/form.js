import React from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import {Link} from 'react-router-dom'


class TransactionForm extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            amount:'',
            description:'',
            event:'',
            events:[],
            isEvent: false,
            isExpense:false,
            category:'',
            categories:[],
            date:''

        }

    }

    handleChange = (e) => {
        e.persist()
        this.setState(() =>({
            [e.target.name]: e.target.value
        }))
    }

    handleExpense = (e) =>{
        if(e.target.checked){
            this.setState((prevState) => ({
                isExpense: !prevState.isExpense
            }))
        }
    }

    onChange = (date) => {
        this.setState({date})
    }

    handleTagChange = (e) =>{
        // const isEvent = e.target.checked
            this.setState((prevState) => ({
            isEvent: !prevState.isEvent
         }))
        }
        
    
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            amount:this.state.amount,
            description:this.state.description,
            isEvent:this.state.isEvent,
            isExpense:this.state.isExpense,
            category:this.state.category,
            date:this.state.date
        }

        this.props.handleSubmit(formData)
    }

    componentDidMount() {
        axios.get(`http://localhost:3005/categories`)
        .then(response => {
            this.setState(() => ({
                categories : response.data
            }))
        })
        
        axios.get(`http://localhost:3005/event`,{
            headers:{
                "x-auth": localStorage.getItem('userAuthToken')
            } 
        })
        .then(response => {
            this.setState(() => ({
               events : response.data 
            }))
        })
    }

    render(){
        return(
            <div className="d-flex justify-content-center">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">        
                        <label>
                            Cash/Amount
                            <input type="text"  className="form-control" value={this.state.amount} name="amount" onChange={this.handleChange} />
                        </label>
                     </div>

                     <div className="form-group">   
                        <label>
                            Description
                            <textarea
                            value={this.state.description}
                            className="form-control"
                            name="description"
                            onChange={this.handleChange}
                            ></textarea>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            isEvent
                            <input type="checkbox"  className="form-control" onClick={this.handleTagChange}/>
                            {this.state.isEvent && <select value={this.state.event} class="form-control" onChange={this.handleChange} name="event">
                                    <option value="">select</option>
                                    {this.state.events.map(event => {
                                        return <option key={event._id} value={event._id}>{event.name}</option>
                                    })}
                                </select>
                            }
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Category
                            <select value={this.state.category}  className="form-control" onChange={this.handleChange} name="category">
                                
                                <option value="">select</option>
                                {this.state.categories.map(category =>{
                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                })}

                            </select>
                        </label>
                    </div>

                    <label>
                        <Calendar onChange={this.onChange}>
                            
                        </Calendar>

                    </label><br/>

                    <div className="form-group">
                        <label>
                            isExpense:
                            <input type="checkbox" value={this.state.isExpense} className="form-control" onClick={this.handleExpense}/>
                        </label>    
                    </div>

                    <input type="submit"/>
                    <Link to='/users/account'><button>Back</button></Link>
                    <hr></hr>
                </form>

            </div>
        )
    }
}

export default TransactionForm