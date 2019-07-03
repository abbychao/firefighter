import React from 'react';

const Nav = ({ position, fireType }) => {
  return (
    <section id="nav">
      <span>Position: <label>{position}</label></span>
      <span>Fire Type: <label>{fireType}</label></span>
    </section >
  );
}

export default Nav;
