import React, { useEffect } from 'react';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { API_PREFIX } from '../constants';
import { format } from 'date-fns/fp';

const formatDateForInput = format("yyyy-MM-dd'T'HH:mm");

function EditQueueForm({ isSubmitting, qid }) {
  const { setValues } = useFormikContext();

  useEffect(() => {
    if (!qid) {
      return;
    }

    fetch(`${API_PREFIX}/queues/${qid}`)
      .then((response) => response.json())
      .then((data) => {
        const formData = {
          course: data.course,
          name: data.name,
          start: formatDateForInput(new Date(data.start)),
          end: formatDateForInput(new Date(data.end)),
          location: data.location,
        };
        setValues(formData);
      });
  }, [qid, setValues]);

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

export default function EditQueue({ match, history }) {
  const qid = match.params.qid;
  const isNew = !qid;

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
        history.push(`/queues/${isNew ? data : qid}`);
      });
    // TODO: handle error
  };

  return (
    <>
      <h2>{isNew ? 'Create new office hours' : 'Edit office hours'}</h2>
      <Formik
        initialValues={{
          course: '',
          name: '',
          start: '',
          end: '',
          location: '',
        }}
        onSubmit={onSubmit}
      >
        {(props) => <EditQueueForm {...props} qid={qid} />}
      </Formik>
    </>
  );
}
