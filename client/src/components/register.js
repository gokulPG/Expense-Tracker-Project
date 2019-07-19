import React from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Too Short!')
      .required('Field Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Field Required'),
    password: Yup.string()
        .min(6,'Too short!')
        .max(12,'Too long!')
        .required('Field Required'),

  });
  

    class  Register extends React.Component{ 
       handleSubmit =(values) =>{
            axios.post('http://localhost:3005/register', values)
                .then((response) => {
                    if(response.data.errors){
                        alert(response.data.errors)
                    }else{
                        this.props.history.push('/users/login')
                    }
                }) 
       }
       
        render(){
            return (
                <div>
                    
                     <h1>REGISTER</h1>
                     <hr></hr>
                     <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password:'',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={this.handleSubmit}
                            >     
                            {({ errors, touched}) => (
                                <Form>
                                       <div className="form-group">
                                                username:
                                                <Field name="username" placeholder="Enter your username" className="form-control" />
                                                {errors.username && touched.username ? (
                                                    <div>{errors.username}</div>
                                                ) : null}
                                        </div><br/>
                                        <div className="form-group">
                                                email:
                                                <Field name="email" type="email" placeholder="abc@gmail.com" className="form-control" />
                                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                        </div><br/>
                                        <div className="form-group">
                                                password:
                                                <Field name="password" type="password" placeholder="******" className="form-control" />
                                                {errors.password && touched.password ? <div>{errors.password}</div> : null}
                                        </div><br/>
                                        <button type="submit">Submit</button>
                                </Form>
                            )}
                    </Formik>
                </div>       
            )}
        
    }

   


export default Register

