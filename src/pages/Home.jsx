import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/office_hours.jpeg'; // Tell Webpack this JS file uses this image

export default function Home() {
  return (
    <>
      <Link to="/queues" class="btn btn-primary btn-lg btn-block" role="button">I am a student</Link><br></br>
      <Link to="/queues/new" class="btn btn-secondary btn-lg btn-block" role="button">I am an instructor</Link><br></br>
      <img src={logo} alt="Code" class="img-fluid mx-auto d-block" alt="Office Hour Clock"/>
    </>
  )
}