import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'
import './css/style.css'

import Register from './components/register'
import Login from './components/login'
import Account from './components/account'
import Logout from './components/logout'

import New from './components/transaction/new'
import Home from './components/transaction/home'
import Show from  './components/transaction/show'

import BudgetNew from './components/budget/budgetNew'
import BudgetList from './components/budget/budgetList'
import ReportList from './components/report/reportList'

import AddReminder from './components/transaction/addReminder'
import Remind from './components/transaction/remind'
import RemShow from './components/transaction/remShow'

class App extends React.Component{
    render(){
        return(
        <BrowserRouter>
            <div>
                <div className=" idea container">
                    <div className="d-flex justify-content-center">
                        <h2><ul>EXPENSE-TRACKER</ul></h2>
                    </div>
                </div>
                <hr></hr>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10">
                            <h3>Welcome back!</h3><br/> 
                            <i className="fa fa-home fa-2x" aria-hidden="true"></i><Link to="/users/home">Home</Link>
                            <Link>&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                            <Link to="/users/budgetList">Budget</Link>
                            <Link>&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                            <Link to="/users/reportList">Report</Link>
                            <Link>&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                            <Link to="/remind">Reminders</Link>
                    </div>
                    <div className="col-md-2" >
                        <ul>
                            {!_.isEmpty(localStorage.getItem('userAuthToken')) ?
                            (<div>
                                <li><Link to="/users/account">Account</Link></li>
                                <li><Link to="/users/home">Home</Link></li>
                                <li><Link to="/users/logout">Logout</Link></li>
                            </div>
                            ):(<div>
                                <li><Link to='/users/register'>Register</Link></li>
                                <li><Link to='/users/login'>Login</Link></li>
                            </div>
                            )}
                        </ul>
                    </div>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-center">           
                <Switch>
                              
                        <Route path="/users/account" component={Account} exact={true}/>
                        <Route path="/users/logout" component={Logout} exact={true} />
                        <Route path="/users/home" component={Home} exact={true}/> 
                        <Route path="/users/register" component={Register} exact={true} />
                        <Route path="/users/login" component={Login} exact={true}/>
                        <Route path="/users/new" component={New} />
                        <Route path="/users/show/:id" component={Show} />
                        <Route path="/users/budgetNew" component={BudgetNew} exact={true} />
                        <Route path="/users/budgetList" component={BudgetList} />
                        <Route path="/users/reportList" component={ReportList} />
                        <Route path="/remind" component={Remind} exact={true}/>
                        <Route path="/addreminder" component={AddReminder} exact={true}/>
                        <Route path="/remShow/:id" component={RemShow} exact={true}/>
                        <Route path="/notification" component={Notification}/>

                </Switch>
                </div>
            </div>
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