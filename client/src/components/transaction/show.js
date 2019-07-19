import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap"

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
                 <Modal
                  isOpen={this.props.modal}
                  toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Transaction Details</ModalHeader>
                    <ModalBody>
                        <div>
                            <h3>{this.state.trans.amount} </h3>
                            <h3>{this.state.trans.description}</h3>
                            <h3>{this.state.trans.category && this.state.trans.category.name}</h3>
                            <h3>{this.state.trans.date}</h3>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>
                        Cancel
                        </Button>
                    </ModalFooter>
                </Modal>   
                {/* <Link to="/users/home">Back</Link> */}
                
            </div>
        )
    }


}


export default TransactionShow