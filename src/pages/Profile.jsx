import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';
import axios from 'axios';

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

const Profile = () => {
  const { auth } = useAuth();
  const [nickname, setNickname] = useState(auth.user.nickname || '');
  const [avatar, setAvatar] = useState(null);

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axios.patch('https://moneyfulpublicpolicy.co.kr/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      alert('프로필이 업데이트되었습니다.');
    } catch (error) {
      console.error(error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Section>
        <h2>프로필 수정</h2>
        <label>
          닉네임
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </label>
        <label>
          아바타 이미지
          <input
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>
        <button onClick={handleProfileUpdate}>프로필 업데이트</button>
      </Section>
    </Container>
  );
};

export default Profile;
