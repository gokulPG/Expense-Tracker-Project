import React from 'react'
import axios from 'axios'
import PieChart from './pieChart'
import BarChart from './barChart'

class ReportList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            transactions:[]        
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3005/transactions',{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
         })
         .then(response => {
             this.setState(() => ({
                 transactions: response.data
             }))
         })
    }

    render(){
        return(
            <div>
            <div className="container">
                 <div className="row">
                        <div className="col-md-6">
                            <PieChart transactions={this.state.transactions}/>
                        </div>
                        <div className="col-md-6">   
                             <BarChart transactions={this.state.transactions} />
                        </div>     
                    </div>   
            </div>
            </div>
        )
    }
}

export default ReportList