import { Avatar } from '@material-ui/core';
import SanityBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import './Author.css';

function Author({ authorImageUrl, author, authorBio }) {
  return (
    <div className="author">
      <div className="author__container">
        <Avatar className="author__avatar" src={authorImageUrl} />
        <div className="author__body">
          <h5>{author}</h5>
          <SanityBlockContent blocks={authorBio} />
        </div>
      </div>
    </div>
  );
}

export default Author;
