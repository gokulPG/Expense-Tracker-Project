import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class BudgetForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            amount:'',
            categories:[],
            category:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3005/categories')
            .then(response => {
                if(response.data.hasOwnProperty('errors')){
                    console.log(response.data.errors)
                }else{
                    this.setState(() => ({
                        categories: response.data
                    }))
                }
            })
    }

    handleChange(e){
        e.persist()
        this.setState(() =>({
            [e.target.name]: e.target.value
        }))
    } 

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            amount: this.state.amount,
            category: this.state.category
        }
        this.props.handleSubmit(formData)

    }  
    handleReset(e){
        this.setState(() => ({
            amount:'',
            category:''
        }))
    }

    render(){
        return(
            <div className="d-flex justify-content-center">
                
                <form onSubmit={this.handleSubmit}>
                        <h2><ul>Add Budget</ul></h2>
                        <hr></hr>
                        <div className="form-group">
                            <label>
                                <p>Cash/Amount</p>
                                <input type="text" value={this.state.amount} name="amount" className="form-control" onChange={this.handleChange} />
                            </label><br/>
                        </div>
                        <div className="form-group">
                            <label>
                                <p>category</p>
                                    <select value={this.state.category} name="category" className="form-control" onChange={this.handleChange}>
                                        <option value="">select</option>
                                        {
                                            this.state.categories.map((category) => {
                                                return <option key={category._id} value={category._id}>{category.name}</option>
                                            })
                                        }
                                    </select>
                            </label><br/>
                        </div>
                        <input type="submit" value="add"/>
                        <input type="reset" value="cancel" onClick={this.handleReset} />
                        <Link to='/users/home'>Back</Link>
                </form>
            </div>    
        )
    }
}

export default BudgetForm
