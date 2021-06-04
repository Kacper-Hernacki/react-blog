import React from 'react';
import './Share.css';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  InstapaperShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  InstapaperIcon,
} from 'react-share';

function Share({ shareUrl }) {
  return (
    <div className="share">
      {' '}
      <h5>Share this:</h5>
      <FacebookShareButton
        url={shareUrl}
        quote={'Hey, see latest post in TheDevsUniverse!'}>
        <FacebookIcon
          size={40}
          round={true}
          logoFillColor="white"></FacebookIcon>
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        quote={'Hey, see latest post in TheDevsUniverse!'}>
        <TwitterIcon size={40} round={true} logoFillColor="white"></TwitterIcon>
      </TwitterShareButton>
      <LinkedinShareButton
        url={shareUrl}
        quote={'Hey, see latest post in TheDevsUniverse!'}>
        <LinkedinIcon
          size={40}
          round={true}
          logoFillColor="white"></LinkedinIcon>
      </LinkedinShareButton>
    </div>
  );
}

export default Share;
