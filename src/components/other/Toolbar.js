import React, { useState, useEffect } from 'react';
import './Toolbar.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LogoWhite from '../assets/images/WhiteLogo.png';
import LogoBlack from '../assets/images/textLogoDark.png';

function Toolbar({ content }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [changeSrc, setChangeSrc] = useState(false);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (width < 408) {
      setChangeSrc(true);
    } else {
      setChangeSrc(false);
    }
  }, [width]);

  //MOBILE LOGO!
  return (
    <div className={`${content ? 'toolbarScrolled' : 'toolbar'}`}>
      {content ? (
        <Link to="/">
          <img className="toolbar__logoImage--black" src={LogoBlack} alt="" />
        </Link>
      ) : (
        <Link to="/">
          <img className="toolbar__logoImage--white" src={LogoWhite} alt="" />
        </Link>
      )}

      <Button
        onClick={() => (window.location.href = 'https://kacperhernacki.pl')}
        className="toolbar__button"
        variant="contained">
        Services
      </Button>
    </div>
  );
}

export default Toolbar;
