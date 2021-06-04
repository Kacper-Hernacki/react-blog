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

  // const serializers = {
  //   types: {
  //     code: (props) => (
  //       <SyntaxHighlighter className="codeBlock" language={props.node.language} styles={}>
  //         {props.node.code}
  //       </SyntaxHighlighter>
  //     ),
  //     image: (props) => (
  //       <figure>
  //         <img
  //           className={styles.blockImage}
  //           src={urlFor(props.node.asset).width(500).url()}
  //           alt=""
  //         />
  //       </figure>
  //     ),
  //   },
  // };

  return (
    <div className="singlePost">
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
            // serializers={serializers}
          />
        </div>
        <Share shareUrl={`http://www.thedevsuniverse.com/${slug}`} />
        <Author
          authorImageUrl={urlFor(singlePost.authorImage).url()}
          author={singlePost.author}
          authorBio={singlePost.authorBio}
        />
        <Comments comments={singlePost?.comments} />
        <CommentsForm _id={singlePost._id} />
        <Footer />
      </div>
    </div>
  );
}
