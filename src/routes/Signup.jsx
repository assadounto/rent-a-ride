/* eslint-disable no-unused-vars */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import './Login.scss';
import { signup } from '../redux/user/user';

function Signup() {
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const loginForm = useRef();

  const [isActive, setActive] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.user.signed_up === true) {
      navigate('/login');
    }
  }, [state.user.signed_up]);

  const sendForm = () => {
    dispatch(signup({
      name: name.current.value,
      username: email.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: passwordConfirmation.current.value,
    }));
  };

  return (
    <div className="container page-login">
      <form action="#" className="login-form" method="POST" id="signup-form" ref={loginForm}>

        <h2>SIGNUP</h2>
        <div className="add-padding-below">
          {state.user.errors && state.user.errors.map((error) => (
            <p className="error-message active" key={error}>{error}</p>
          ))}
          <input
            ref={name}
            type="text"
            id="name"
            name="name"
            className="form-field"
            placeholder="Name"
            required
          />
        </div>

        <div className="add-padding-below">
          <input
            ref={email}
            type="email"
            id="email"
            name="email"
            className="form-field"
            placeholder="Email"
            required
          />
        </div>

        <div className="add-padding-below">
          <input
            ref={password}
            type="text"
            id="password"
            name="password"
            className="form-field"
            placeholder="Password"
            required
          />
        </div>

        <div className="add-padding-below">
          <input
            ref={passwordConfirmation}
            type="text"
            id="password"
            name="password"
            className="form-field"
            placeholder="Password confirmation"
            required
          />
        </div>

        <p className="signin-message">
          Already have an account?
          <Link to="/login">
            LOGIN
          </Link>
        </p>

        <div className="form-bottom-bar">
          <Button
            btnAxn={sendForm}
            label="Signup"
            size="main"
            color="dark"
          />
        </div>
      </form>

    </div>
  );
}

export default Signup;
