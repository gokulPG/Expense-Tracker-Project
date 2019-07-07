import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Field Required'),
    password: Yup.string()
        .min(6,'Too short!')
        .max(12,'Too long!')
        .required('Field Required'),

  });
  

    class Login extends React.Component{
        handleSubmit = (values) => {
            axios.post('http://localhost:3005/login', values)
                .then((response) => {
                    if(response.data.errors){
                        alert(response.data.errors)
                    }else{
                        const token = response.data.token
                        localStorage.setItem('userAuthToken', token)
                        this.props.history.push('/users/account')
                    }
                }) 
        }
        
        render(){
            return(
                <div>
                    <h1>LOGIN</h1>
             <Formik
                    initialValues={{
                        email: '',
                        password:'',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={this.handleSubmit}
                    >
                    {({ errors, touched}) => (
                        <Form>
                                email:
                                <Field name="email" type="email" />
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}<br/>
                                password:
                                <Field name="password" type="password" />
                                {errors.password && touched.password ? <div>{errors.password}</div> : null}<br/>

                                <button type="submit">Submit</button>
                        </Form>
                    )}
            </Formik>
                </div>
            )
        }
    }

export default Login

