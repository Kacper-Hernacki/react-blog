import React, { useState, useEffect } from 'react';
import sanityClient from '../client.js';
import '../styles/Home.css';
import Post from './other/Post.js';
import Toolbar from './other/Toolbar';
import CookieConsent from 'react-cookie-consent';
import Pagination from './other/Pagination.js';
import Newsletter from './other/Newsletter.js';
import Footer from './other/Footer.js';
import LogoWhite from './assets/images/WhiteLogo.svg';

export default function Home() {
  const [postData, setPostData] = useState(null);
  const [content, setContent] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);

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

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setContent(true);
    } else {
      setContent(false);
    }
  };

  if (typeof window !== 'undefined') {
    // browser code
    window.addEventListener('scroll', changeBackground);
  }

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postData?.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Toolbar content={content} />
      <div className={`${content ? 'appScrolled' : 'app'}`}>
        <div className="app__logo">
          <img className="logoImage" alt="" src={LogoWhite} />
        </div>
        <div className={`${content ? 'fadeBottom__scrolled' : 'fadeBottom'}`} />
        <h3 className="app__recent">
          <span>Recent Posts:</span>
        </h3>
        <div className="app__feed">
          {postData?.length ? (
            postData.map((p) => (
              <Post
                slug={p.slug.current}
                mainImage={p.mainImage}
                title={p.title}
                publishedAt={p.publishedAt}
                fragment={p.fragment}
                categories={p.categories}
                authorName={p.authorName}
                counter={p.counter}
                authorAvatar={p.authorAvatar}
                content={content}
              />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={postData?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        {/* <Newsletter /> */}
        <Footer />

        <CookieConsent
          location="bottom"
          buttonText="I accept"
          cookieName="myAwesomeCookieName2"
          style={{ background: '#2B373B' }}
          buttonStyle={{
            backgroundColor: 'white',
            color: '#2f3640',
            fontSize: '13px',
            fontWeight: '700',
            borderRadius: '5px',
          }}
          expires={150}>
          This website uses cookies to enhance the user experience.{' '}
          <span>
            Click the button to accept our
            <span
              style={{
                fontWeight: 'bold',
                color: '#3498db',
                cursor: 'pointer',
              }}
              onClick={() =>
                (window.location.href =
                  'https://www.freeprivacypolicy.com/live/1990102f-41df-49af-9688-5a225151306e')
              }>
              {' '}
              privace policy
            </span>
          </span>
        </CookieConsent>
      </div>
    </>
  );
}
