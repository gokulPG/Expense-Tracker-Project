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
            <div id="center">
                <div className="nav nav-pills nav-stacked anyClass">
                    {
                        this.state.budgets.map((budget) => {
                            // return <li key={budget._id}>{budget.category}-{budget.amount}<button onClick={()=>{this.handleDelete(budget)}}>X</button></li>
                            // <div className="card" style={{width:"500px"}}>
                            //         <div className="card-body">
                            //             <h4 id="center" className="card-title">
                            //                 <div>
                            //                     category:{budget.category}
                            //                     amount:{budget.amount}
                            //                     expense:{budget.expense}
                            //                     spent:{budget.spent}
                            //                 </div>
                            //             </h4>
                            //         </div>
                            //  </div>
                            })
                    }
                </div>    
                <Link to='/users/budgetNew'>Add budget</Link><br/>
                <Link to='/users/home'>Back</Link>
                
            </div>
        )
    }
}

export default BudgetList