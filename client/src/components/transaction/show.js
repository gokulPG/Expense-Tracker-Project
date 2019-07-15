import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class TransactionShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trans:{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3005/transactions/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response=> {
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors)
            }else{
                this.setState(() => ({
                    trans: response.data
                }))
            }
        })
    }

    render(){
        return(
            <div>
                
                <h2>Transaction</h2><br/>

                <h3>cash/amount: {this.state.trans.amount} </h3><br/>
                <h3>description: {this.state.trans.description}</h3><br/>
                <h3>category: {this.state.trans.category}</h3><br/>
                <h3>date: {this.state.trans.date}
                </h3><br/>

                <Link to="/home">Back</Link>
            </div>
        )
    }


}

export default TransactionShow