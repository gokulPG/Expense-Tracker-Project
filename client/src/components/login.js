import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password:this.state.password
        }
        axios.post('http://localhost:3005/login', formData)
             .then((response) => {
                 if(response.data.errors){
                     alert(response.data.errors)
                 }else{
                     const token = response.data.token
                     localStorage.setItem('userAuthToken',token)
                     this.props.history.push('/users/account')
                 }
             })
        }

    render(){
        return(
            <div>
                <h3>LOGIN</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                         email
                         <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />   
                    </label><br/>
                    <label>
                          password
                          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />  
                    </label>

                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}

export default Login