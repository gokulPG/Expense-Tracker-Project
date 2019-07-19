import React from 'react'
import TransactionNew from './new'
import TransactionList from './list'

import axios from 'axios';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            income:0,
            expense:0,
            balance:0,
            isClick:false,
        }
    }

    componentDidMount(){

     if(localStorage.getItem('userAuthToken')){

        axios.get('http://localhost:3005/stats',{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            // console.log("reload" + response.data.income)
            const income = response.data.income
            const expense = response.data.expense
            const balance = income - expense

            this.setState(() => ({
                income,
                expense,
                balance
            }))
        })
     }       
}

    handleExpense = (data) => {
       axios.get('http://localhost:3005/stats',{
           headers:{
               'x-auth':localStorage.getItem('userAuthToken')
           }
       })
        .then(response => {
            console.log('form response', response.data)
            if(response.data.errors){
                alert(response.data.errors)
            }else{
                this.setState(() => ({
                    income : response.data.income,
                    expense : response.data.expense,
                    balance : response.data.income - response.data.expense,
                    isClick: false
                }))
            }
        })
    }

    handleClick=() => {
        this.setState(() => ({
            isClick: true
        }))
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <div id="center">
                <h1><u>DASHBOARD</u></h1>
                </div>
                <hr></hr>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3><b>Income:</b>{this.state.income}</h3> 
                        </div>
                        <div className="col-md-3">
                            <h3><b>Expense:</b>{this.state.expense}</h3>
                        </div>
                        <div className="col-md-4">
                             <h3><b>Balance:</b>{this.state.balance}</h3>
                        </div>
                        <div className="col-md-1">
                             <button onClick={this.handleClick}>add transaction</button>
                        </div>
                     </div>   
                </div>
                <hr></hr>

                <div className="d-flex justify-content-center">
                    
                    {this.state.isClick && <TransactionNew handleExpense={this.handleExpense}/>}
                </div>
               

                <h2><ul>Transactions Overview</ul></h2>
                <hr></hr>
                {!this.state.isClick && <TransactionList handleExpense={this.handleExpense} />}
                {/* <Link to='/new'>new</Link> */}
            </div>
        )
    }
}
export default Home
