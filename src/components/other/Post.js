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
  content,
}) {
  console.log(authorAvatar);
  return (
    <div className="post__container">
      <Link style={{ textDecoration: 'none' }} to={'/post/' + slug} key={slug}>
        <div className={`${content ? 'post' : 'post postScrolled'}`}>
          {mainImage && (
            <img
              className="post__mainImage"
              src={urlFor(mainImage).url()}
              alt="img"
            />
          )}
          <h3
            className={`${
              content ? 'post__title' : 'post__title post__titleScrolled'
            }`}>
            {title}
          </h3>
          <p className="post__fragment">{fragment}</p>
          <div className="post__categories">
            {categories?.map((category) => (
              <p className="post__category" key={category}>
                # {category}
              </p>
            ))}
          </div>

          <div className="post__bioFooter">
            <div className="post__authorAvatar">
              <Avatar src={urlFor(authorAvatar).url()} />
            </div>

            <div className="post__bioFooter__right">
              <p>{authorName}</p>
              <div className="post__bioFooter__rightDate">
                <p>{new Date(publishedAt).toDateString()}</p>
                <h3>{counter} min read</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
