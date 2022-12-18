/* eslint-disable linebreak-style */
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
  const user = { loggedIn: false };
  if (localStorage.getItem('token')) {
    user.loggedIn = true;
  }
  return user.loggedIn;
};

function ProtectedRoutes() {
  const isAuth = useAuth();
  return (
    isAuth ? <Outlet /> : <Navigate to="/login" />
  );
}

export default ProtectedRoutes;
