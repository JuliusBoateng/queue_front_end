import { formatDistanceToNow, formatRelative } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_PREFIX } from '../constants';

export default function SingleQueueInfo({ queue, match, history }) {
  const qid = match.params.qid;

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

  const deleteStudent = (sid) => {
    if (
      !window.confirm(
        'Are you sure you want to remove this student from line? This cannot be undone.'
      )
    ) {
      return;
    }

    fetch(`${API_PREFIX}/queues/${qid}/students/${sid}`, { method: 'DELETE' }).then(() => {
      // history.push('/queues');
      window.location.reload();
    });
  };

  return (
    <>
      <p>
        [<Link to={`${match.url}/edit`}>edit</Link>]
        <button type="button" onClick={deleteQueue}>
          delete
        </button>
      </p>
      <p>
        {formatRelative(new Date(queue.start), Date.now())} to{' '}
        {formatRelative(new Date(queue.end), Date.now())}
      </p>
      {queue.students.length === 0 ? (
        'No students in line'
      ) : (
        <ol>
          {queue.students.map((student) =>
            // TEMPORARY: remove when student is an object
            typeof student === 'string' ? (
              <li key={student}>
                <Link to={`${match.url}/students/${student}`}>{student}</Link>{' '}
                <button type="button" onClick={() => deleteStudent(student)}>
                  remove
                </button>
              </li>
            ) : (
              <li key={student.id.$oid}>
                <Link to={`${match.url}/students/${student.id.$oid}`}>{student.name}</Link> (in line
                for {formatDistanceToNow(new Date(student.time))}){' '}
                <button type="button" onClick={() => deleteStudent(student.id.$oid)}>
                  remove
                </button>
              </li>
            )
          )}
        </ol>
      )}
    </>
  );
}
