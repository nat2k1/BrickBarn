// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = ({ element, ...rest }) => {
  const [user] = useAuthState(auth);

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;
