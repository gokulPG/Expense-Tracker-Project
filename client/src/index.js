import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

import App  from './App'
import { Provider } from 'react-redux'
import { setUser } from './actions/userAction'

import configureStore from './store/configureStore'

const store = configureStore()

store.subscribe(() => {
    console.log('redux Store state', store.getState())
})

console.log(store.getState())

//user reloaded page
if(localStorage.getItem('userAuthToken')){
    axios.get('http://localhost:3005/account', {
        headers:{
            'x-auth':localStorage.getItem('userAuthToken')
        }
    })
    .then(response => {
        store.dispatch(setUser(response.data))
    })
}

const provider = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(provider, document.getElementById('root'))




















// import React from 'react'
// import ReactDOM from 'react-dom'
// import {BrowserRouter, Route} from 'react-router-dom'
// import Transactionform from './components/transaction/form'
// import TransactionList from './components/transaction/new'
// class App extends React.Component{

//     render(){
//         return(
//             <BrowserRouter>
//             <div>
//                 <Transactionform />
//                 <Route path="/show" component={TransactionList}> </Route>
//             </div>
//             </BrowserRouter>
//         )
//     }
// }

// ReactDOM.render(<App />, document.getElementById('root'));
