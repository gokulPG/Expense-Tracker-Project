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
                <hr></hr>
                <div className="card" style={{width:"500px"}}>
                    <div className="card-body">
                        <h4 id="center" className="card-title">
                            <div>
                                Username: {this.props.user.username}<br/>
                                <hr></hr>
                                Email: {this.props.user.email}
                            </div>
                        </h4>
                    </div>
               </div>
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