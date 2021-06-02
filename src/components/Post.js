import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Post() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == '${slug}']{
        title,
        _id,
        slug,
        publishedAt,
        mainImage{
          asset->{
          _id,
          url
        }
       },
        body,
      'author': author->name,
      'authorAvatar': author->avatarImage,
      'authorImage': author->image,
      'authorBio': author->bio,
      'categories': categories[]->title,
      'counter': counter,
      'comments':*[_type == "comment" && post._ref == ^._id ]|order(publishedAt desc){
         _id,
         name,
         email,
         comment,
    _createdAt}
}`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  console.log(singlePost);

  if (!singlePost) return <div>Loading...</div>;

  return (
    <div>
      <h1>{singlePost.title}</h1>
      <p>{singlePost.counter}</p>
      <img src={urlFor(singlePost.mainImage).url()} alt="img" />
      <p>{new Date(singlePost.publishedAt).toDateString()}</p>
      {singlePost.categories?.map((category) => (
        <p key={category}># {category}</p>
      ))}
      <BlockContent
        projectId="78wde2tk"
        dataset="production"
        blocks={singlePost.body}
      />
    </div>
  );
}
