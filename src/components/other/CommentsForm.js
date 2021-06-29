import React, { useState } from 'react';
import './CommentsForm.css';
import Button from '@material-ui/core/Button';
import db from '../../firebase';
import firebase from 'firebase';

function CommentsForm({ _id }) {
  // Sets up our form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    setIsSubmitting(true);

    db.collection('comments').doc(`${_id}`).collection('comment').add({
      name: name,
      email: email,
      comment: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setIsSubmitting(false);
    setHasSubmitted(true);
  };

  if (isSubmitting) {
    // Returns a "Submitting comment" state if being processed
    return <h3>Submitting comment…</h3>;
  }

  if (hasSubmitted) {
    // Returns the data that the user submitted for them to preview after submission
    return (
      <div className="support">
        <h3 className="support__header">Thanks for your comment!</h3>
        <ul>
          <p className="support__dataContainer">
            <p className="support__data">
              {' '}
              <span>Name:</span> {name}
            </p>

            <p className="support__data">
              {' '}
              <span>Email:</span> {email}
            </p>
            <p className="support__data">
              {' '}
              <span>Comment:</span> {comment}
            </p>
          </p>
        </ul>
      </div>
    );
  }

  return (
    <form className="commentsForm" onSubmit={handleSubmit} disabled>
      {' '}
      <h5>Share a comment</h5>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        value={name}
        className="input"
        required
      />
      {/* include validation with required or other standard HTML validation rules */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="e-mail"
        value={email}
        className="input"
        required
      />
      <textarea
        onChange={(e) => setComment(e.target.value)}
        rows="8"
        placeholder="Share your comment"
        value={comment}
        required></textarea>
      {/* errors will return when field validation fails  */}
      <Button variant="contained" className="shareButton" type="submit">
        {' '}
        Submit
      </Button>
    </form>
  );
}

export default CommentsForm;
