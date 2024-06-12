import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (id.length < 4 || id.length > 10) {
      setError('아이디는 4~10글자여야 합니다.');
      return;
    }

    if (password.length < 4 || password.length > 15) {
      setError('비밀번호는 4~15글자여야 합니다.');
      return;
    }

    if (nickname.length < 1 || nickname.length > 10) {
      setError('닉네임은 1~10글자여야 합니다.');
      return;
    }

    try {
      await axios.post('https://moneyfulpublicpolicy.co.kr/register', { id, password, nickname });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message || '회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <div>
        <label>아이디</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">회원가입</button>
      <button type="button" onClick={() => navigate('/login')}>로그인</button>
    </form>
  );
};

export default Register;
