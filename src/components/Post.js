import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import '../styles/Post.css';
import Toolbar from '../components/other/Toolbar';
import { Avatar } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Share from './other/Share.js';
import Author from './other/Author.js';
import Footer from './other/Footer.js';
import Comments from './other/Comments.js';
import CommentsForm from './other/CommentsForm.js';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Helmet from 'react-helmet';
import db from '../firebase';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Post() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();
  const [postComments, setPostComments] = useState([]);

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
}`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    db.collection('comments')
      .doc(singlePost?._id)
      .collection('comment')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPostComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [singlePost?._id]);

  console.log(singlePost?._id, postComments);

  if (!singlePost) return <div className="loader">Loading...</div>;

  if (typeof window !== 'undefined') {
    //scroll-progress
    window.onscroll = function () {
      myFunction();
    };

    const myFunction = () => {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      var myBar = document.getElementById('myBar');
      if (myBar) {
        document.getElementById('myBar').style.width = scrolled + '%';
      }
    };
  }

  const serializers = {
    types: {
      code: (props) => (
        <SyntaxHighlighter
          className="codeBlock"
          language={props.node.language}
          styles={docco}>
          {props.node.code}
        </SyntaxHighlighter>
      ),
    },
  };

  return (
    <div className="singlePost">
      <Helmet>
        {' '}
        <meta charSet="utf-8" />
        <title>{singlePost.title}</title>
        <meta name="description" content="Blog about webdevelopment" />
        <meta
          name="keywords"
          content="web, development, api, react, angular, frontend, backend, fullstack"
        />
        <meta name="author" content="Kacper Hernacki" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Toolbar /> <div id="myBar" className="singlePost__progress"></div>
      <div className="singlePost__container">
        <h1 className="singlePost__title">{singlePost.title}</h1>
        <div className="singlePost__bioFooter">
          <div className="singlePost__authorAvatar">
            <Avatar src={urlFor(singlePost.authorAvatar).url()} />
          </div>
          <div className="singlePost__bioFooter__right">
            <p>{singlePost.author}</p>{' '}
            <div className="singlePost__bioFooter__rightDate">
              <p>{new Date(singlePost.publishedAt).toDateString()}</p>
              <h3>{singlePost.counter} min read</h3>
            </div>
          </div>
        </div>
        <div className="singlePost__categories">
          {singlePost.categories?.map((category) => (
            <p className="singlePost__category" key={category}>
              # {category}
            </p>
          ))}
        </div>

        <img
          className="singlePost__frontImage"
          src={urlFor(singlePost.mainImage).url()}
          alt="img"
        />
        <div className="singlePost__body">
          <BlockContent
            imageOptions={{ fit: 'max' }}
            projectId="78wde2tk"
            dataset="production"
            blocks={singlePost.body}
            serializers={serializers}
          />
        </div>
        <Share shareUrl={`https://www.thedevsuniverse.com/${slug}`} />
        <Author
          authorImageUrl={urlFor(singlePost.authorImage).url()}
          author={singlePost.author}
          authorBio={singlePost.authorBio}
        />
        <h5>Comments:</h5>
        {postComments?.map(({ id, data }) => (
          <Comments
            key={id}
            id={id}
            name={data.name}
            email={data.email}
            comment={data.comment}
            timestamp={data.timestamp}
          />
        ))}
        <CommentsForm _id={singlePost?._id} />
      </div>{' '}
      <Footer />
    </div>
  );
}
