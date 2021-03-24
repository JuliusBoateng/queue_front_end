import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { API_PREFIX } from '../constants';
import EditStudent from './EditStudent';
import SingleStudentInfo from './SingleStudentInfo';

export default function SingleStudent({ history, location, match }) {
  const sid = match.params.sid;
  const isUpdated = location.search === '?updated=true';
  const [status, setStatus] = useState('Loading...');
  const [student, setStudent] = useState();

  useEffect(() => {
    fetch(`${API_PREFIX}/students/${sid}`)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setStatus(null);

        if (isUpdated) {
          history.replace(location.pathname);
        }
      })
      .catch(() => {
        // setStatus('Not found – invalid ID');
        // TEMPORARY FOR TESTING ONLY
        setStudent({
          name: 'PLACEHOLDER NAME',
          time: '2021-03-22T21:53:31.379453Z',
          desc: 'PLACEHOLDER DESCRIPTION',
        });
        setStatus(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sid, isUpdated]);

  return (
    <>
      {/* <Link to="/queues">Back to all office hours</Link> */}
      {status || (
        <>
          <h3>{student.name}</h3>
          <Switch>
            <Route
              path={`${match.path}/edit`}
              render={(props) => <EditStudent student={student} {...props} />}
            />
            <Route
              path={match.path}
              render={(props) => <SingleStudentInfo student={student} {...props} />}
            />
          </Switch>
        </>
      )}
    </>
  );
}
