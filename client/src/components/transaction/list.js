import React from 'react'
import axios from 'axios'
import { Table } from 'reactstrap'
import {Link} from 'react-router-dom'
import TransactionShow from './show'

class TransactionList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            transactions:[],
            modal:false,
            id: ''
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.toggle = this.toggle.bind(this);
    }
    
    toggle(id) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          id: id 
        }));
      }

    componentDidMount(){
        axios.get('http://localhost:3005/transactions',{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            // console.log('list '+response.data)
            this.setState(() => ({
                transactions: response.data
            }))
        })
      }

      
      handleDelete(trans){
        const confirmRemove=window.confirm('are you sure?')
        if(confirmRemove){
            axios.delete(`http://localhost:3005/transactions/${trans._id}`,{
                headers:{
                    'x-auth': localStorage.getItem('userAuthToken')
                }
            })
            .then(response => {
                this.setState((prevState) => ({
                    transactions: prevState.transactions.filter(item => item._id !== trans._id)
                }))
                this.props.handleExpense(response.data)
            })
        }
      }

    render(){
        return(
            <div id="center" >
                    {this.state.modal && <TransactionShow id={this.state.id}  toggle={this.toggle} modal={this.state.modal} /> }
                    <div>
                    <Table className="nav nav-pills nav-stacked anyClass">
                        <tbody>
                                {this.state.transactions.length > 0 && this.state.transactions.map(item => {
                                    return (
                                        <tr key={item._id}>
                                            <th scope="row"> {item._id}</th> 
                                            <td>
                                                <Link onClick={() => {
                                                    this.toggle(item._id)
                                                }}>
                                                    {item.description}
                                                </Link>
                                               
                                            </td>
                                            <td>{item.amount}/-</td>
                                            <td>{item.date}</td>
                                            <td><button onClick={()=>{this.handleDelete(item)}}>X</button></td>
                                        </tr>
                                    );
                            })}
                    </tbody>
                </Table>
                </div>
            </div>
            )
    }

}

export default TransactionList

 {/* <ul className="nav nav-pills nav-stacked anyClass">
                        {this.state.transactions.length > 0 && this.state.transactions.map(trans => {
                            return (
                                <div>
                                    <li className="nav-item" key={trans._id}><Link onClick={() => {this.toggle(trans._id)}}>{trans.description}<br/>
                                                                                        cost:{trans.amount}/-<br/>
                                                                                        Date:{trans.date}</Link>
                                    <button onClick={()=>{this.handleDelete(trans)}}>X</button></li><br/>
                                </div>)
                        })}
                    </ul> */}