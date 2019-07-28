import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class BudgetList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            budgets:[]
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:3005/stats/budget',{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            this.setState(() => ({
                budgets: response.data
            }))

        })
           
    }

    handleDelete(bud){
        const confirmRemove=window.confirm('are you sure?')
        if(confirmRemove){
            axios.delete(`http://localhost:3005/budget/${bud._id}`,{
                headers:{
                    'x-auth': localStorage.getItem('userAuthToken')
                }
            })
            .then(response => {
                this.setState((prevState) => ({
                    budgets: prevState.budgets.filter(budget => budget._id !== bud._id)
                }))
                
            })
        }
      }

    render(){
        return(
            <div id="center" className="bomborder">
                <h2 id="center">BUDGET LIST</h2>
                <div className="card centre nav nav-pills nav-stacked anyClass">
                    {
                        this.state.budgets.map((budget) => {
                            // return <li key={budget._id}>{budget.category}-{budget.amount}<button onClick={()=>{this.handleDelete(budget)}}>X</button></li>
                         return (
                                <div>   
                                        <div className="card bomborder" style={{width:"500px"}}>
                                        <div className="card-body">
                                            <h4 id="center" className="card-title">
                                                <div >
                                                    <h3>{budget.category}</h3><br/>
                                                    Amount:- {budget.amount}
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow={budget.amount} aria-valuemin="0" aria-valuemax={budget.amount}></div>
                                                    </div><br/>
                                                    Expense:- {budget.expense}
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="10000">{budget.expense}</div>
                                                    </div><br/>
                                                    Spent:- {budget.spent}
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{budget.spent}</div>
                                                    </div><br/>
                                                    {/* amount:{budget.amount}<br/>
                                                    expense:{budget.expense}<br/>
                                                    spent:{budget.spent}<br/> */}
                                                </div>
                                            </h4>
                                        </div>
                                    </div>
                                </div>    
                            ) 
                            })
                    }
                </div>
                <br/>    
                <Link to='/users/budgetNew'>Add budget</Link><br/>
                <Link to='/users/home'>Back</Link>
                
            </div>
        )
    }
}

export default BudgetList