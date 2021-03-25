import React from 'react';
import { Field, Form, Formik } from 'formik';
import { API_PREFIX } from '../constants';

function EditStudentForm({ isSubmitting }) {
  return (
    <Form>
      <label>
        Name
        <Field name="name" required />
      </label>
      <label>
        Short description of question
        <Field name="desc" />
      </label>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
}

export default function EditStudent({ student, match, history }) {
  const { qid, sid } = match.params;
  const isNew = !sid;

  const onSubmit = (values, { setSubmitting }) => {
    const newValues = { ...values };
    if (isNew) {
      newValues.time = new Date().toISOString();
    }

    const url = `${API_PREFIX}/${isNew ? `queues/${qid}/students` : `students/${sid}`}`;
    const method = isNew ? 'POST' : 'PUT';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValues),
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitting(false);
        // Redirect to the new/existing queue
        history.push(`/queues/${qid}/students/${isNew ? data : `${sid}?updated=true`}`);
      });
    // TODO: handle error
  };

  const initialValues = student || {
    name: '',
    desc: '',
    time: '',
  };

  return (
    <>
      <h2>{isNew ? 'Join office hours' : 'Edit student details'}</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => <EditStudentForm {...props} />}
      </Formik>
    </>
  );
}
