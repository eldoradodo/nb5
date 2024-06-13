import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>로그인</h2>
        <div style={inputContainerStyle}>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>로그인</button>
        <Link to="/register" style={registerLinkStyle}>회원가입</Link>
      </form>
    </div>
  );
};

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '20px',
  textAlign: 'center'
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #cccccc',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#2ec4b6',
  color: '#ffffff',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '10px'
};

const registerLinkStyle = {
  display: 'block',
  marginTop: '10px',
  textAlign: 'center',
  color: '#2ec4b6',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const errorStyle = {
  color: 'red',
  fontSize: '14px'
};

export default Login;
