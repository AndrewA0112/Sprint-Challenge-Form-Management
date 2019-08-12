import React, { useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import './RegisterForm.scss';

const RegisterForm = ({ errors, touched, status, history }) => {
    // // console.log(users);
    // console.log('Current status', status)
    if(localStorage.getItem('token') !== null){
        history.push('/')
    }

    useEffect(() => {
        if(status) {
            history.push('/')
        }
    }, [status])

    return (
        <div>
            <h1 data-testid='registerTitle'>Register</h1>
            <Form className='registerForm'>
                <Field type='text' name='username' placeholder='Username' className='registerFormField'/>
                {touched.username && errors.username && (
                    <p className='errorMessage'>{errors.username}</p>
                )}
                <Field type='password' name='password' placeholder='Password' className='registerFormField'/>
                {touched.password && errors.password && (
                    <p className='errorMessage'>{errors.password}</p>
                )}
                <button data-testid='registerBtn' type='submit'>Register</button>
            </Form>
        </div>
    )
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({username, password}) {
        return {
            username: username || '',
            password: password || ''
        }
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is a required field'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is a required field'),
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        console.log(values)
        axios
            .post('http://localhost:5000/api/register', values)
            .then(response => {
                if(!response.data.error){
                    window.localStorage.setItem('token', response.data.token)
                    setStatus(true)
                }
                resetForm();
            })
            .catch(error => {
                console.log(error.response)
            })
    }
})(RegisterForm)

export default FormikRegisterForm;