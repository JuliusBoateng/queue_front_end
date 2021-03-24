import { formatRelative } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { API_PREFIX } from '../constants';

export default function SingleStudentInfo({ student, match, history }) {
  const qid = match.params.qid;
  const sid = match.params.sid;

  const deleteStudent = () => {
    if (
      !window.confirm(
        'Are you sure you want to leave this line? This cannot be undone.'
      )
    ) {
      return;
    }

    fetch(`${API_PREFIX}/queues/${qid}/students/${sid}`, { method: 'DELETE' }).then(() => {
      history.push('/queues');
    });
  };

  return (
    <>
      <p>
        [<Link to={`${match.url}/edit`}>edit</Link>]
        <button type="button" onClick={deleteStudent}>
          leave line
        </button>
      </p>
      <p>
        In line since {formatRelative(new Date(student.time), Date.now())}
      </p>
      <p>{student.desc}</p>
    </>
  );
}
