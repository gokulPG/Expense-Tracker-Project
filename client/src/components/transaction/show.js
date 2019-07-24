import React from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import Moment from 'react-moment'

class TransactionShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            trans:{}
        }
    }

    componentDidMount(){
        const id = this.props.id
        axios.get(`http://localhost:3005/transactions/${id}`,{
            headers:{
                'x-auth': localStorage.getItem('userAuthToken')
            }
        })
        .then(response=> {
            // console.log(response.data.description)
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                this.setState(() => ({
                    trans: response.data
                }))
            }
        })
    }

    render(){
        console.log(this.props)
        return(
            <div>
                {/* <Popup trigger={<button>Open modal</button>} modal> */}
                        {close => (
                        <div className="header">
                            
                            <div className="header"> Transaction details</div>
                            <div className="content">
                            {""}
                                {
                                    <ul>
                                        <li>{this.props.item.description}</li>
                                        <li>{this.props.item.amount}</li>
                                        <li>{this.props.item.isExpense ? 'Expense': 'Income'}</li>
                                        <li>{this.props.item.category && this.props.item.category.name}</li>
                                        <li><Moment>{this.props.item.date}</Moment></li>
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
                    {/* </Popup> */}
            </div>
        )
    }


}


export default TransactionShow