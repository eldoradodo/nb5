import React, { useState } from 'react';

const ExpenseItem = ({ expense, updateExpense, deleteExpense }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(expense);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateExpense(expense.id, form);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input type="date" name="date" value={form.date} onChange={handleChange} required />
                    <input type="text" name="item" value={form.item} onChange={handleChange} required />
                    <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
                    <input type="text" name="description" value={form.description} onChange={handleChange} required />
                    <button type="submit">저장</button>
                    <button type="button" onClick={() => setIsEditing(false)}>취소</button>
                </form>
            ) : (
                <>
                    <span>{expense.month}월 {expense.date}일</span>
                    <span>{expense.item}</span>
                    <span>{expense.amount}원</span>
                    <span>{expense.description}</span>
                    <button onClick={() => setIsEditing(true)}>수정</button>
                    <button onClick={() => deleteExpense(expense.id)}>삭제</button>
                </>
            )}
        </li>
    );
};

export default ExpenseItem;
