import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function CreateExpense({ addExpense }) {
  const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
  const [date, setDate] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    addExpense({ 
      date, 
      item, 
      amount, 
      description, 
      createdBy: user.nickname, 
      userId: user.id 
    });
    setDate('');
    setItem('');
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>날짜</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>항목</label>
        <input
          type="text"
          placeholder="지출 항목"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>금액</label>
        <input
          type="number"
          placeholder="지출 금액"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>내용</label>
        <input
          type="text"
          placeholder="지출 내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>추가</button>
    </form>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '20px',
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  maxWidth: '800px',
  margin: '20px auto'
};

const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  flex: '1 1 20%',
  minWidth: '150px'
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: 'bold'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #D1D5DB',
  fontSize: '14px'
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#6543ff',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: '16px',
  alignSelf: 'flex-end'
};
