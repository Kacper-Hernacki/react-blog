import React, { useState } from 'react';
import './Newsletter.css';
import Button from '@material-ui/core/Button';
import db from '../../firebase';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('IDLE');
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = (e) => {
    if (email) {
      setIsSubmitting(true);
      db.collection('newsletter')
        .add({
          email: email,
        })
        .catch(alert.error);
      setEmail('');
      setIsSubmitting(false);
      setHasSubmitted(true);
    }
  };

  if (isSubmitting) {
    // Returns a "Submitting comment" state if being processed
    return (
      <div className="newsletter">
        <h3>Subscribing...</h3>
      </div>
    );
  }

  if (hasSubmitted) {
    // Returns the data that the user submitted for them to preview after submission
    return (
      <div className="newsletter">
        <h3>Thanks for your subscription!</h3>
      </div>
    );
  }

  return (
    <div className="newsletter">
      {' '}
      <h5>Sign for Newsletter </h5>
      <form onSubmit={subscribe} className="newsletter__inputs">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          className="button"
          type="submit"
          disabled={state === 'LOADING'}
          variant="contained">
          Subscribe
        </Button>
      </form>
      {state === 'ERROR' && <p className="error">{errorMessage}</p>}
      {state === 'SUCCESS' && <p className="success">SUCCESS!</p>}
    </div>
  );
}

export default Newsletter;
