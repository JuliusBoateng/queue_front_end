import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_PREFIX } from '../constants';

export default function SingleQueue({ match }) {
  const qid = match.params.qid;
  const [status, setStatus] = useState('Loading...');
  const [queue, setQueue] = useState();

  useEffect(() => {
    fetch(`${API_PREFIX}/queues/${qid}`)
      .then((response) => response.json())
      .then((data) => {
        setQueue(data);
        setStatus(null);
      }).catch(() => {
        setStatus('Not found – invalid ID')
      });
  }, [qid]);

  return (
    <>
      <h2>Queue {qid}</h2>
      {status || (
        <p>
          {queue.course} – {queue.name} [<Link to={`${match.url}/edit`}>edit</Link>]
        </p>
      )}
    </>
  );
}
