import React from 'react';
import './Comments.css';

function Comments({ comments = [] }) {
  return (
    <div className="comments">
      <h5>Comments:</h5>
      <div className="comments__container">
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <p className="comments__comment" key={_id}>
            <h4>
              <span>{name}</span> says:
            </h4>
            <p className="comments__date">
              {new Date(_createdAt).toDateString()}
            </p>
            <p>{comment}</p>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Comments;
