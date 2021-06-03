import React from 'react';
import './Post.css';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../client.js';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function Post({
  slug,
  mainImage,
  title,
  publishedAt,
  fragment,
  categories,
  authorName,
  counter,
  authorAvatar,
}) {
  return (
    <div className="post">
      {' '}
      <Link to={'/post/' + slug} key={slug}>
        <div>
          <img src={urlFor(mainImage).url()} alt="img" />
          <div>{title}</div>
          <p>{new Date(publishedAt).toDateString()}</p>
          <div>{fragment}</div>
          {categories?.map((category) => (
            <p key={category}># {category}</p>
          ))}
          <p>{authorName}</p>
          <p>{counter}</p>
          <Avatar src={urlFor(authorAvatar).url()} />
        </div>
      </Link>
    </div>
  );
}

export default Post;
