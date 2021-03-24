import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { API_PREFIX } from '../constants';

export default function EditQueue({ match, history }) {
  const [initialValues] = useState({
    course: '',
    name: '',
    start: '',
    end: '',
    location: '',
  });

  const onSubmit = (values, { setSubmitting }) => {
    const newValues = { ...values };
    newValues.start = new Date(values.start).toISOString();
    newValues.end = new Date(values.end).toISOString();
    newValues.students = [];

    fetch(`${API_PREFIX}/queues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValues),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitting(false);
        history.push(`/queues/${data}`);
      });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label>
            Course name
            <Field name="course" required />
          </label>
          <label>
            Instructor name
            <Field name="name" required />
          </label>
          <label>
            Start time
            <Field type="datetime-local" name="start" required />
          </label>
          <label>
            End time
            <Field type="datetime-local" name="end" required />
          </label>
          <label>
            Location (building or URL)
            <Field name="location" required />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
