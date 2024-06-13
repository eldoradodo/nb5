import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user } = useAuth();

  return (
    <div>
      {user && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
