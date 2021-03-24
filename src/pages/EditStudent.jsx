import React, { useEffect } from 'react';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { API_PREFIX } from '../constants';

function EditStudentForm({ isSubmitting, sid }) {
  const { setValues } = useFormikContext();

  useEffect(() => {
    if (!sid) {
      return;
    }

    fetch(`${API_PREFIX}/students/${sid}`)
      .then((response) => response.json())
      .then((data) => {
        const formData = {
          name: data.name,
          desc: data.desc,
          time: data.time,
        };
        setValues(formData);
      });
  }, [sid, setValues]);

  return (
    <Form>
      <label>
        Name
        <Field name="name" required />
      </label>
      <label>
        Description of question
        <Field name="desc" required />
      </label>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
}

export default function EditStudent({ match, history }) {
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
        history.push(`/queues/${qid}/students/${isNew ? data : sid}`);
      });
    // TODO: handle error
  };

  return (
    <Formik
      initialValues={{
        name: '',
        desc: '',
        time: '',
      }}
      onSubmit={onSubmit}
    >
      {(props) => <EditStudentForm {...props} sid={sid} />}
    </Formik>
  );
}
