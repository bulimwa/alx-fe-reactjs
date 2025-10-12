import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Formik validation logic
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Form submitted with Formik:', values);
      
      // Mock API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          username: values.username,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful with Formik:', data);
        alert('Registration successful with Formik!');
        resetForm();
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>User Registration (Formik)</h2>
      {/* Formik integration */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="registration-form">
            <div className="form-group">
              <label htmlFor="formik-username">Username:</label>
              <Field
                type="text"
                id="formik-username"
                name="username"
                className={errors.username && touched.username ? 'error' : ''}
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="formik-email">Email:</label>
              <Field
                type="email"
                id="formik-email"
                name="email"
                className={errors.email && touched.email ? 'error' : ''}
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="formik-password">Password:</label>
              <Field
                type="password"
                id="formik-password"
                name="password"
                className={errors.password && touched.password ? 'error' : ''}
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register with Formik'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
