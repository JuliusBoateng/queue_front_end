import React, { useEffect, useState } from 'react';
import { API_PREFIX } from '../constants';

export default function SingleQueue({ match }) {
  const qid = match.params.qid;
  const [isLoading, setIsLoading] = useState(true);
  const [queue, setQueue] = useState();

  useEffect(() => {
    fetch(`${API_PREFIX}/queues/${qid}`)
      .then((response) => response.json())
      .then((data) => {
        setQueue(data);
        setIsLoading(false);
      });
  }, [qid]);

  return (
    <>
      <h2>Queue {qid}</h2>
      {isLoading ? (
        'Loading...'
      ) : (
        <p>
          {queue.course} – {queue.name}
        </p>
      )}
    </>
  );
}
