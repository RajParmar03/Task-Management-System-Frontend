import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './index.css'; 
import { createTask, getAllTask } from '../../utils/tasks.utils';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasks/tasks.action';

const Add = ({setIsAdding}) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
    status: Yup.string().required('Status is required'),
    category: Yup.string(),
  });
  
  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    description: '',
    priority: '',
    status: '',
    category: '',
  };

  const onSubmit = async (values, { setSubmitting , resetForm}) => {
    await createTask(values);
    resetForm();
    let response = await getAllTask();
    dispatch(addTask(response));
    setSubmitting(false);
    setIsAdding(false);
  };

  return (
    <div className="add-container">
      <h2>Add Task</h2>
      <button className="close-button" onClick={() => setIsAdding(false)}>X</button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="add-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" className="input-field" placeholder='Enter title'/>
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field type="text" name="description" className="input-field" placeholder='Enter description'/>
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <Field as="select" name="priority" className="input-field">
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Field>
              <ErrorMessage name="priority" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <Field as="select" name="status" className="input-field">
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In-progress</option>
                <option value="completed">Completed</option>
              </Field>
              <ErrorMessage name="status" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Field type="text" name="category" className="input-field" placeholder='Enter category'/>
              <ErrorMessage name="category" component="div" className="error-message" />
            </div>
            <div className="button-group">
              <button type="submit" disabled={isSubmitting} className="submit-button">
                Add Task
              </button>
              <button type="button" onClick={() => setIsAdding(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Add;
