import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/user.utils';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    let response = await loginUser(values);
    console.log("response =====>>>>", response);
    if (!(response.status === "success")) {
      alert(response.error);
    } else {
      setSubmitting(false);
      resetForm();
      navigate("/dashboard");
      window.location.reload();
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder='Enter email' />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder='Enter password' />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
