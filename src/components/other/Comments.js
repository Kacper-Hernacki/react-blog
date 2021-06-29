import React from 'react';
import './Comments.css';

function Comments({ key, id, name, email, comment, timestamp }) {
  return (
    <div className="comments">
      <div className="comments__container">
        <p className="comments__comment">
          <h4>
            <span>{name}</span> says:
          </h4>
          <p className="comments__date">
            {new Date(timestamp?.toDate()).toLocaleString()}
          </p>
          <p>{comment}</p>
        </p>
      </div>
    </div>
  );
}

export default Comments;
