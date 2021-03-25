import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { API_PREFIX } from '../constants';
import EditQueue from './EditQueue';
import EditStudent from './EditStudent';
import SingleQueueInfo from './SingleQueueInfo';
import SingleStudent from './SingleStudent';

export default function SingleQueue({ history, location, match }) {
  const qid = match.params.qid;
  const isUpdated = location.search === '?updated=true';
  const [status, setStatus] = useState('Loading...');
  const [queue, setQueue] = useState();

  useEffect(() => {
    fetch(`${API_PREFIX}/queues/${qid}`)
      .then((response) => response.json())
      .then((data) => {
        setQueue(data);
        setStatus(null);

        if (isUpdated) {
          history.replace(location.pathname);
        }
      })
      .catch(() => {
        setStatus('Not found – invalid ID');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qid, isUpdated]);

  return (
    <>
      <Link to="/queues">Back to all office hours</Link>
      <h2>Queue ID: {qid}</h2>
      {status || (
        <>
          <p>
            Course: {queue.course} <br></br> Name: {queue.name}
          </p>
          <Switch>
            <Route
              path={`${match.path}/edit`}
              render={(props) => <EditQueue queue={queue} {...props} />}
            />
            <Route
              path={`${match.path}/join`}
              render={(props) => <EditStudent queue={queue} {...props} />}
            />
            <Route
              path={`${match.path}/students/:sid`}
              render={(props) => <SingleStudent queue={queue} {...props} />}
            />
            <Route
              path={match.path}
              render={(props) => <SingleQueueInfo queue={queue} {...props} />}
            />
          </Switch>
        </>
      )}
    </>
  );
}
