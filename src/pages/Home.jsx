import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h2>Welcome</h2>
      <Link to="/queues">I am a student</Link>
      <Link to="/queues/new">I am an instructor</Link>
    </>
  )
}