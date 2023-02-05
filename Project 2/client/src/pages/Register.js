import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {
    const initialValues = {
        username: "",
        password: "",
    };
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            alert("User successfully registered!");
        });
    };

    return <div className="register">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className="form-container">
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="input-create-post" name="username" placeholder="Username" autocomplete="off" />
                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field id="input-create-post" type="password" name="password" placeholder="Password" autocomplete="off" />

                    <button type="submit"> Register </button>
                </Form>
        </Formik>
    </div>
}

export default Register;