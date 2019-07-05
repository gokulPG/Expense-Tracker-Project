import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {resetUser} from '../actions/userAction'

class Logout extends React.Component{
    componentDidMount(){
        axios.delete('http://localhost:3005/logout',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response => {
            localStorage.removeItem('userAuthToken')
            this.props.dispatch(resetUser())
            this.props.history.push('/users/login')
        })
    }
    render(){
        return(
            <div>
                <p> logging out </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Logout)