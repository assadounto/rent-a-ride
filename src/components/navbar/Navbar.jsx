/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-script-url */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBars,
  FaFacebookF,
  FaGooglePlusG,
  FaPinterestP,
  FaTimes,
  FaTwitter,
} from 'react-icons/fa';
import './Navbar.scss';
import Button from '../button/Button';

const Navbar = () => {
  const state = useSelector((state) => state.user);

  const [navVisible, setNavVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 400) {
      setNavVisible(false);
    }

    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const endSession = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <>
      <div className="menuMobile" onClick={() => setNavVisible(!navVisible)}>
        <FaBars className="icon" />
      </div>
      <div className={navVisible ? 'navbar nav-show' : 'navbar nav-hide'}>
        <div
          className="closeBtn"
          onClick={() => setNavVisible(false)}
        >
          <FaTimes className="icon" />
        </div>

        <div className="navTop">
          <Link to="/" className="img-container" onClick={() => setNavVisible(!navVisible)} />

          <nav>
            <ul>
              <li>
                <NavLink to="/models" onClick={() => setNavVisible(false)}>
                  MODELS
                </NavLink>
              </li>
              <li>
                <NavLink to="/reservation" onClick={() => setNavVisible(false)}>
                  MY RESERVATIONS
                </NavLink>
              </li>
              <li>
                <NavLink to="/booking" onClick={() => setNavVisible(false)}>
                  RESERVATIONS
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={() => setNavVisible(false)}>
                  ABOUT
                </NavLink>
              </li>
              {state.user.role === 'admin' && (
              <li>
                <NavLink to="/admin" onClick={() => setNavVisible(false)}>
                  ADMIN
                </NavLink>
              </li>
              )}
              {isLoggedIn && (
              <li className="logout-button">
                <Button
                  label="LOGOUT"
                  size="normal"
                  color="dark"
                  btnAxn={endSession}
                />
              </li>
              )}

            </ul>
          </nav>
        </div>

        <div className="social-icons">
          <ul>
            <li><FaTwitter className="icon" /></li>
            <li><FaFacebookF className="icon" /></li>
            <li><FaGooglePlusG className="icon" /></li>
            <li><FaPinterestP className="icon" /></li>
          </ul>
          <p>Microverse Copyright 2022</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
