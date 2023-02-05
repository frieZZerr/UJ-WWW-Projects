import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContex';

function CreatePost() {

    let navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText: ""
    };
    
    useEffect( () => {
        if( !localStorage.getItem('accessToken') ) {
            navigate("/login");
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("A title can not be blank!"),
        postText: Yup.string()
    });
    
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data , {
            headers: { accessToken: localStorage.getItem('accessToken') }
        })
        .then( (response) => {
            navigate("/");
        });
    };

    return (
        <div className="create-post-page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                <Form className="form-container">
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="input-create-post" name="title" placeholder="Title" autocomplete="off" />
                    <label>Post:</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field id="input-create-post" name="postText" placeholder="Post Text" autocomplete="off" />

                    <button type="submit">Create Post</button>
                </Form>
            </Formik>
        </div>
    )
};

export default CreatePost;