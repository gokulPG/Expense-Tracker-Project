import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

import Register from './components/register'
import Login from './components/login'
import Account from './components/account'
import Logout from './components/logout'

import New from './components/transaction/new'
import Home from './components/transaction/home'
import Show from  './components/transaction/show'

class App extends React.Component{
    render(){
        return(
        <BrowserRouter>
            <div>
                <ul>
                    {!_.isEmpty(localStorage.getItem('userAuthToken')) ?
                    (<div>
                        <li><Link to="/users/account">Account</Link></li>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/users/logout">Logout</Link></li>
                    </div>
                    ):(<div>
                        <li><Link to='/users/register'>Register</Link></li>
                        <li><Link to='/users/login'>Login</Link></li>
                    </div>
                    )}
                </ul>
                <Switch>
                        <Route path="/users/account" component={Account} exact={true} />
                        <Route path="/users/logout" component={Logout} />
                        <Route path="/users/register" component={Register} exact={true} />
                        <Route path="/users/login" component={Login} exact={true}/>
                        <Route path="/home" component={Home} exact={true}/>
                        <Route path="/new" component={New} />
                        <Route path="/show/:id" component={Show} />
                </Switch>
            </div>
        </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }
export default connect(mapStateToProps)(App)