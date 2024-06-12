import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExpenseInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExpenseDate = styled.span`
  font-size: 12px;
  color: #666;
`;

const ExpenseDescription = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const ExpenseAmount = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #ff4d4d;

  &:hover {
    background-color: #cc0000;
  }
`;

const ExpenseList = ({ expenses, updateExpense, deleteExpense }) => {
  return (
    <ListContainer>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id}>
          <ExpenseInfo>
            <ExpenseDate>{expense.date}</ExpenseDate>
            <ExpenseDescription>{expense.item} - {expense.description} (by {expense.createdBy})</ExpenseDescription>
            <ExpenseAmount>{expense.amount.toLocaleString()} 원</ExpenseAmount>
          </ExpenseInfo>
          <ButtonGroup>
            <ActionButton onClick={() => updateExpense(expense.id)}>수정</ActionButton>
            <DeleteButton onClick={() => deleteExpense(expense.id)}>삭제</DeleteButton>
          </ButtonGroup>
        </ExpenseItem>
      ))}
    </ListContainer>
  );
};

export default ExpenseList;
