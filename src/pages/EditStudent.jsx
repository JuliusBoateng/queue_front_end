import React from 'react';
import { Field, Form, Formik } from 'formik';
import { API_PREFIX } from '../constants';

function EditStudentForm({ isSubmitting }) {
  return (
    <Form>
    <div class="form-group">
      <label> Student Name </label>
      <Field class="form-control" name="name" required aria-describedby="name" placeholder="Student Name"/>
    </div>

    <div class="form-group">
    <label> Question Description </label>
      <Field class="form-control" name="desc" aria-describedby="desc" placeholder="Description"/>
    </div>

    <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
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
    newValues.time = new Date().toISOString();

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
      <h2>{isNew ? 'Join Office Hours' : 'Edit Student Details'}</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => <EditStudentForm {...props} />}
      </Formik>
    </>
  );
}
