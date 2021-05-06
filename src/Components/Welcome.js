import React from 'react';

function Welcome(props) {
  return (
    <section className='welcome'>
      <h1>ברוכים הבאים!</h1>

      <p>{` היי ${props.name} ברוכים הבאים לעסק שלכם: ${props.businessName} `}</p>

      <button
        type='button'
        className='btn-primary form-btn'
        onClick={props.logout}
      >
        Log out
      </button>
    </section>
  );
}

export default Welcome;
