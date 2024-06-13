import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={navStyle}>
      <div style={navLeftStyle}>
        <Link to="/" style={navButtonStyle}>홈</Link>
        {user && <Link to="/profile" style={navButtonStyle}>내 프로필</Link>}
      </div>
      <div style={navRightStyle}>
        {user ? (
          <>
            <img src={user.avatar} alt="프로필" style={avatarStyle} />
            <span style={nicknameStyle}>{user.nickname}</span>
            <button onClick={logout} style={logoutButtonStyle}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" style={navButtonStyle}>로그인</Link>
            <Link to="/register" style={navButtonStyle}>회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#2ec4b6',
  color: '#FFFFFF',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderBottom: '1px solid #D1D5DB'
};

const navLeftStyle = {
  display: 'flex',
  gap: '10px'
};

const navRightStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const navButtonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  color: '#000000',
  textDecoration: 'none',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%'
};

const nicknameStyle = {
  fontWeight: 'bold',
  marginLeft: '10px'
};

const logoutButtonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#EF4444',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontWeight: 'bold'
};
