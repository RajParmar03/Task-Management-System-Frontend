import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { registerUser } from '../../utils/user.utils';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    await registerUser(values);
    setSubmitting(false);
    resetForm();
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" placeholder='Enter name'/>
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder='Enter email'/>
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <Field type="text" name="mobile" placeholder='Enter mobile'/>
              <ErrorMessage name="mobile" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder='Enter password'/>
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" name="confirmPassword" placeholder='Enter same password again'/>
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
