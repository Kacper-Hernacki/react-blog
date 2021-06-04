import React, { useState } from 'react';
import './Newsletter.css';
import Button from '@material-ui/core/Button';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('IDLE');
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = (e) => {
    if (email) {
      fetch(`/api/memberAdd?email=${email}`)
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="newsletter">
      {' '}
      <h5>Sign for Newsletter </h5>
      <div className="newsletter__inputs">
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="button"
          type="button"
          disabled={state === 'LOADING'}
          onClick={subscribe}
          variant="contained">
          Subscribe
        </Button>
      </div>
      {state === 'ERROR' && <p className="error">{errorMessage}</p>}
      {state === 'SUCCESS' && <p className="success">SUCCESS!</p>}
    </div>
  );
}

export default Newsletter;
