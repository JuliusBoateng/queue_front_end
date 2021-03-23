import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_PREFIX } from '../constants';

export default function AllQueues() {
  const [isLoading, setIsLoading] = useState(true);
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    fetch(`${API_PREFIX}/queues`)
      .then((response) => response.json())
      .then((data) => {
        setQueues(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h2>All office hours</h2>
      {isLoading
        ? 'Loading...'
        : queues.length === 0
        ? 'No queues found'
        : queues.map((queue) => (
            <p key={queue.id.$oid}>
              <Link to={`/queues/${queue.id.$oid}`}>{queue.course} – {queue.name}</Link>
            </p>
          ))}
    </>
  );
}
