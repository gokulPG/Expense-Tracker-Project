import React from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'

class TransactionForm extends React.Component{
    constructor(props){
        super(props) 
        this.state = {
            amount:'',
            description:'',
            events:'',
            isEvent: false,
            category:'',
            categories:[],
            date:new Date()

        }

    }

    handleChange = (e) => {
        e.persist()
        this.setState(() =>({
            [e.target.name]: e.target.value
        }))
    }

    handleTagChange = (e) =>{
        const isEvent = e.target.checked
        this.setState((prevState) => ({
               isEvent: prevState.isEvent
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            amount:this.state.amount,
            description:this.state.description,
            isEvent:this.state.isEvent,
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
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Cash/Amount
                        <input type="text" value={this.state.amount} name="Amount" onChange={this.handleChange} />
                    </label><br/><br/>
                    <label>
                        Description
                        <textarea
                        value={this.state.description}
                        name="description"
                        onChange={this.handleChange}
                        ></textarea>
                    </label><br/><br/>
                    <label>
                        isEvent
                        <input type="checkbox" onClick={this.handleTagChange}/>

                    </label><br/><br/>
                    <label>
                        Category
                        <select value={this.state.category} onChange={this.handleChange} name="category">
                            <option value="">select</option>
                            {this.state.categories.map(category =>{
                                return <option key={category._id} value={category._id}>{category.name}</option>
                            })}

                        </select>
                    </label><br/><br/>
                    <label>
                        <Calendar onChange={this.handleDateChange} value={this.state.date}>
                            
                        </Calendar>

                    </label><br/><br/>
                    
                    <input type="submit"/>
                </form>

            </div>
        )
    }
}

export default TransactionForm