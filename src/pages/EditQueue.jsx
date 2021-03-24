import React from 'react';
import { Field, Form, Formik } from 'formik';
import { API_PREFIX } from '../constants';
import { format } from 'date-fns/fp';

const formatDateForInput = format("yyyy-MM-dd'T'HH:mm");

function EditQueueForm({ isSubmitting }) {
  return (
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
  );
}

export default function EditQueue({ queue, match, history }) {
  const qid = match.params.qid;
  const isNew = !qid;

  const initialValues = queue
    ? {
        course: queue.course,
        name: queue.name,
        start: formatDateForInput(new Date(queue.start)),
        end: formatDateForInput(new Date(queue.end)),
        location: queue.location,
      }
    : {
        course: '',
        name: '',
        start: '',
        end: '',
        location: '',
      };

  const onSubmit = (values, { setSubmitting }) => {
    const newValues = { ...values };
    newValues.start = new Date(values.start).toISOString();
    newValues.end = new Date(values.end).toISOString();
    newValues.students = [];

    const url = `${API_PREFIX}/${isNew ? 'queues' : `queues/${qid}`}`;
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
        history.push(`/queues/${isNew ? data : `${qid}?updated=true`}`);
      });
    // TODO: handle error
  };

  return (
    <>
      <h3>{isNew ? 'Create new office hours' : 'Edit office hours'}</h3>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => <EditQueueForm {...props} />}
      </Formik>
    </>
  );
}
