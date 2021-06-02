import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Home() {
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]|order(publishedAt desc){
          title,
          publishedAt,
          slug,
          fragment,
          'categories': categories[]->title,
          'authorName': author->name,
          'authorSlug': author->slug,
          'authorAvatar': author->avatarImage,
          'counter': counter,
          mainImage{
              asset->{
                  _id,
                  url
              },
              alt
          }
      }`
      )
      .then((data) => setPostData(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      {postData?.length ? (
        postData.map((p) => (
          <>
            <Link to={'/post/' + p.slug.current} key={p.slug.current}>
              <div>
                <img src={urlFor(p.mainImage).url()} alt="img" />
                <div>{p.title}</div>
                <p>{new Date(p.publishedAt).toDateString()}</p>
                <div>{p.fragment}</div>
                {p.categories?.map((category) => (
                  <p key={category}># {category}</p>
                ))}
                <p>{p.authorName}</p>
                <p>{p.counter}</p>
                <Avatar src={urlFor(p.authorAvatar).url()} />
              </div>
            </Link>
          </>
        ))
      ) : (
        <h1>No posts</h1>
      )}
    </div>
  );
}
