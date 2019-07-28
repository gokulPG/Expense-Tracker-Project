 import React from 'react'
import axios from 'axios'
import { Table } from 'reactstrap'
import {Link} from 'react-router-dom'
import TransactionShow from './show'
import Moment from 'react-moment'
import Popup from 'reactjs-popup'


class TransactionList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            transactions:[],
            isItem:false,
            item: '',
            month:''
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDescription = this.handleDescription.bind(this);
    }
    
    handleDescription(item) {
        this.setState(() => ({
            isItem: true,
            item: item
        }))
      }

    componentDidMount(){
        axios.get('http://localhost:3005/transactions',{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            // console.log('list '+response.data)
            var Xmas95 = new Date()
            var options = { month: 'long'}
            var month = new Intl.DateTimeFormat('en-US', options).format(Xmas95);

            this.setState(() => ({
                transactions: response.data,
                month: month
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

            <div className="card centre nav nav-pills nav-stacked anyClass">
                    {this.state.isItem && <TransactionShow item={this.state.item}/>}

                    <div>
                    <Table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Month</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Date/Timings</th>
                        </tr>
                    </thead>
                        <tbody>
                                {this.state.transactions.length > 0 && this.state.transactions.map((item,index) => {
                                    return (
                                        <tr key={item._id}>
                                            <th scope="row">{index}</th>
                                            <td>{this.state.month}</td> 
                                            <td>
                                                <Link onClick={() => {
                                                    this.handleDescription(item)
                                                }}>
                                                     <Popup trigger={<Link>{item.description}</Link>} modal>
                                                     {close => (
                                                            <div className="header">
                                                                
                                                                <div className="header"> Transaction details</div>
                                                                <div className="content">
                                                                {""}
                                                                    {
                                                                        <ul>
                                                                            <li>{item.description}</li>
                                                                            <li>{item.amount}</li>
                                                                            <li>{item.isExpense ? 'Expense': 'Income'}</li>
                                                                            <li>{item.category && item.category.name}</li>
                                                                            <li><Moment>{item.date}</Moment></li>
                                                                        </ul>
                                                                    }
                                                                </div>
                                                                <div className="actions">
                                                                <button
                                                                    className="button"
                                                                    onClick={() => {
                                                                    console.log("modal closed ");
                                                                    close();
                                                                    }}
                                                                >
                                                                    close modal
                                                                </button>
                                                                </div>
                                                            </div>
                                                            )}
                                                     </Popup>
                                                    
                                                </Link>
                                               
                                            </td>
                                            <td>{item.amount}/-</td>
                                            <td><Moment>{item.date}</Moment></td>
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

 