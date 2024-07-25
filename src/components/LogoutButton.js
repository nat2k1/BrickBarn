// src/components/LogoutButton.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push('/signin'); // Redirect to sign-in page after logout
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
