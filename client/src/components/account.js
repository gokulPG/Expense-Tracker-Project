import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUser} from '../actions/userAction' 

class Account extends React.Component{
    componentDidMount(){
        axios.get('http://localhost:3005/account',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            const user = response.data
            this.props.dispatch(setUser(user))
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h2>Account Details</h2>
                <ul>
                    <li><h4>{this.props.user.username}</h4></li>
                    <li>email: {this.props.user.email}</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Account)