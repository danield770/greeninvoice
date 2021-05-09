import React from 'react';
import { useAuth } from '../Hooks/useAuth.js';

function Welcome() {
  const auth = useAuth();
  return (
    <section className='welcome'>
      <h1>ברוכים הבאים!</h1>

      <p>{` היי ${auth && auth.state.user.firstName} ברוכים הבאים לעסק שלכם: ${
        auth && auth.state.user.businesses[0].name
      } `}</p>

      <button
        type='button'
        className='btn-primary form-btn'
        onClick={auth && auth.logout}
      >
        Log out
      </button>
    </section>
  );
}

export default Welcome;
