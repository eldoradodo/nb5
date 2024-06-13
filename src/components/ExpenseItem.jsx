// src/components/ExpenseItem.jsx

import React, { useState } from 'react';

const ExpenseItem = ({ expense, updateExpense, deleteExpense }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...expense });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpense(form.id, form);
    setIsEditing(false);
  };

  return (
    <div className="expense-item p-4 border rounded shadow">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="항목"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="금액"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="내용"
            className="p-2 border rounded"
          />
          <div className="flex gap-2">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              저장
            </button>
            <button
              type="button"
              className="p-2 bg-gray-300 rounded"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p>{expense.date}</p>
            <p>{expense.item} - {expense.amount}원</p>
            <p>{expense.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="p-2 bg-yellow-500 text-white rounded"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
            <button
              type="button"
              className="p-2 bg-red-500 text-white rounded"
              onClick={() => deleteExpense(expense.id)}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseItem;
