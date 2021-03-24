import { formatRelative } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_PREFIX } from '../constants';

export default function SingleQueue({ match, history }) {
  const qid = match.params.qid;
  const [status, setStatus] = useState('Loading...');
  const [queue, setQueue] = useState();

  useEffect(() => {
    fetch(`${API_PREFIX}/queues/${qid}`)
      .then((response) => response.json())
      .then((data) => {
        setQueue(data);
        setStatus(null);
      })
      .catch(() => {
        setStatus('Not found – invalid ID');
      });
  }, [qid]);

  const deleteQueue = () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this office hours session? This cannot be undone.'
      )
    ) {
      return;
    }

    fetch(`${API_PREFIX}/queues/${qid}`, { method: 'DELETE' }).then(() => {
      history.push('/queues');
    });
  };

  return (
    <>
      <Link to="/queues">Back to all office hours</Link>
      <h2>Queue {qid}</h2>
      {status || (
        <>
          <p>
            {queue.course} – {queue.name} [<Link to={`${match.url}/edit`}>edit</Link>]
            <button type="button" onClick={deleteQueue}>
              delete
            </button>
          </p>
          <p>
            {formatRelative(new Date(queue.start), Date.now())} to{' '}
            {formatRelative(new Date(queue.end), Date.now())}
          </p>
        </>
      )}
    </>
  );
}
