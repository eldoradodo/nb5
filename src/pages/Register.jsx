import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '', nickname: '' });
  const { register } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.id.length < 4 || credentials.id.length > 10) {
      setError('아이디는 4~10글자로 입력해주세요.');
      return;
    }
    if (credentials.password.length < 4 || credentials.password.length > 15) {
      setError('비밀번호는 4~15글자로 입력해주세요.');
      return;
    }
    if (credentials.nickname.length < 1 || credentials.nickname.length > 10) {
      setError('닉네임은 1~10글자로 입력해주세요.');
      return;
    }

    try {
      await register(credentials);
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>회원가입</h2>
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
        <div style={inputContainerStyle}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={credentials.nickname}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>회원가입</button>
        <Link to="/login" style={registerLinkStyle}>로그인</Link>
      </form>
    </div>
  );
};

const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#cbbfff'
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
  backgroundColor: '#6543ff',
  color: '#ffffff',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '10px'
};

const registerLinkStyle = {
  display: 'block',
  marginTop: '10px',
  textAlign: 'center',
  color: '#6543ff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const errorStyle = {
  color: 'red',
  fontSize: '14px'
};

export default Register;
