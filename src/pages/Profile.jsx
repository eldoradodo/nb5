import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    nickname: '',
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setProfileData({ nickname: user.nickname, avatar: user.avatar });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setProfileData({ ...profileData, avatar: files[0] });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      alert('프로필 업데이트 완료');
      navigate('/'); // 홈 페이지로 리디렉션
    } catch (error) {
      alert('프로필 업데이트 실패: ' + error.message);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>내 프로필</h2>
        <div style={inputContainerStyle}>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={profileData.nickname}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputContainerStyle}>
          <label htmlFor="avatar">프로필 이미지</label>
          <input
            type="file"
            name="avatar"
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>업데이트</button>
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

export default Profile;
