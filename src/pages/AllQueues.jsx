import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_PREFIX } from '../constants';

export default function AllQueues({ history, location }) {
  const [isLoading, setIsLoading] = useState(true);
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('search');
    const url = `${API_PREFIX}/${
      search ? `queues/search?q=${encodeURIComponent(search)}` : 'queues'
    }`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQueues(data);
        setIsLoading(false);
      });
  }, [location.search]);

  const onSearch = (values, { setSubmitting }) => {
    console.log(values);
    history.push(
      values.search
        ? `${location.pathname}?search=${encodeURIComponent(values.search)}`
        : location.pathname
    );
    setSubmitting(false);
  };

  return (
    <>
      <h2>All office hours</h2>
      <Formik initialValues={{ search: '' }} onSubmit={onSearch}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="search" name="search" />
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
      {isLoading
        ? 'Loading...'
        : queues.length === 0
        ? 'No queues found'
        : queues.map((queue) => (
            <p key={queue.id.$oid}>
              <Link to={`/queues/${queue.id.$oid}/join`}>
                {queue.course} – {queue.name}
              </Link>{' '}
              [<Link to={`/queues/${queue.id.$oid}`}>details</Link>]
            </p>
          ))}
    </>
  );
}
