/* eslint linebreak-style: ["error", "windows"] */
import { Link } from 'react-router-dom';
import {  useRef, useState } from 'react';
import Button from '../components/button/Button';
import './Login.scss';
import React from 'react';
import { login } from '../redux/user/user';
import { useDispatch ,useSelector} from 'react-redux';


function LoginScreen() {
  const userState = useSelector(state => state.user);
  const sendForm = useRef();
  const loginForm = useRef();
  const email = useRef();
  const password = useRef();

  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const loginHandler = (e) => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    
   if (passwordValue===""&& emailValue==="") {
      setPassError("Email and Password Cannot Be blank")
    }
    else if (passwordValue==="") {
      setPassError("Please Provide Password")
    }
    else if (emailValue==="") {
      setPassError("Please Provide Email")
    }
    else {
      setEmailError('');
      setPassError('')
      dispatch(login({email: emailValue, password: passwordValue}));
    }
    
  };
  return (

    <div className="container page-login">
    
      <form action="#" className="login-form" method="POST" ref={loginForm}>
      <div>{userState.user.signed_up == true && "Signed up successful. Please Login"}</div>
      <div>{userState.error|| emailError || passError}</div>
        <h2>LOGIN</h2>

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

        <p className="signin-message">
          Don&apos;t have an account yet?
          <Link to="/signup">
            SIGN UP
          </Link>
        </p>

        <div className="form-bottom-bar">
          <Button
            btnAxn={loginHandler}
            label="Login"
            size="main"
            color="dark"
          />
        </div>
      </form>

    </div>
  );
}
export default LoginScreen;
