import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import Transactionform from './components/transaction/form'
import TransactionList from './components/transaction/new'
class App extends React.Component{

    render(){
        return(
            <BrowserRouter>
            <div>
                <Transactionform />
                <Route path="/show" component={TransactionList}> </Route>
            </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
