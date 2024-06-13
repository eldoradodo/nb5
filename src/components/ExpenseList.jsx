import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ExpenseList({ expenses, updateExpense, deleteExpense }) {
  const { user } = useAuth();

  const handleClick = (expense) => {
    if (expense.userId !== user.id) {
      alert('작성자만 수정 및 삭제가 가능합니다.');
    } else {
      const isEdit = window.confirm('이 항목을 수정하시겠습니까?');
      if (isEdit) {
        const newItem = prompt('새로운 항목 이름을 입력하세요:', expense.item);
        const newAmount = prompt('새로운 금액을 입력하세요:', expense.amount);
        const newDescription = prompt('새로운 설명을 입력하세요:', expense.description);

        if (newItem && newAmount && newDescription) {
          updateExpense({
            id: expense.id,
            item: newItem,
            amount: newAmount,
            description: newDescription,
            date: expense.date,
            createdBy: expense.createdBy,
            userId: expense.userId
          });
        }
      } else {
        const isDelete = window.confirm('이 항목을 삭제하시겠습니까?');
        if (isDelete) {
          deleteExpense(expense.id);
        }
      }
    }
  };

  return (
    <div style={listStyle}>
      {expenses.map((expense) => (
        <div key={expense.id} style={cardStyle} onClick={() => handleClick(expense)}>
          <div style={cardHeaderStyle}>
            <div style={cardTitleStyle}>{expense.item}</div>
            <div style={cardAmountStyle}>{expense.amount} 원</div>
          </div>
          <div style={cardBodyStyle}>
            <div style={cardDateStyle}>{expense.date}</div>
            <div style={cardDescriptionStyle}>{expense.description}</div>
            <div style={cardCreatedByStyle}>작성자: {expense.createdBy}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px'
};

const cardStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  cursor: 'pointer'
};

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #D1D5DB',
  paddingBottom: '10px',
  marginBottom: '10px'
};

const cardTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold'
};

const cardAmountStyle = {
  fontSize: '18px',
  color: '#38B000',
  fontWeight: 'bold'
};

const cardBodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const cardDateStyle = {
  fontSize: '14px',
  color: '#6B7280'
};

const cardDescriptionStyle = {
  fontSize: '16px'
};

const cardCreatedByStyle = {
  fontSize: '14px',
  color: '#6B7280'
};
