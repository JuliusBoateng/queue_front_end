import React from 'react';
import { Field, Form, Formik } from 'formik';
import { API_PREFIX } from '../constants';
import { format } from 'date-fns/fp';

const formatDateForInput = format("yyyy-MM-dd'T'HH:mm");

function EditQueueForm({ isSubmitting }) {
  return (
    <Form>
      <div class="form-group">
        <label> Course Name </label>
        <Field class="form-control" name="course" required aria-describedby="course" placeholder="Course Name"/>
      </div>

      <div class="form-group">
      <label> TA Name </label>
        <Field class="form-control" name="name" required aria-describedby="name" placeholder="TA Name"/>
      </div>

      <div class="form-group">
      <label> Start Time </label>
        <Field class="form-control" type="datetime-local" name="start" required aria-describedby="start"/>
      </div>

      <div class="form-group">
      <label> End time </label>
        <Field class="form-control" type="datetime-local" name="end" required aria-describedby="end"/>
      </div>
      
      <div class="form-group">
      <label> Location (Building or Zoom URL) </label>
        <Field class="form-control" name="location" required aria-describedby="location" placeholder="Location"/>
      </div>

      <button type="submit" class="btn btn-primary" disabled={isSubmitting}>
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
      <h3>{isNew ? 'Create New Office Hours' : 'Edit Office Hours'}</h3>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => <EditQueueForm {...props} />}
      </Formik>
    </>
  );
}
