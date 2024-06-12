import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, updateExpense, deleteExpense }) => {
    return (
        <ul>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    updateExpense={updateExpense}
                    deleteExpense={deleteExpense}
                />
            ))}
        </ul>
    );
};

export default ExpenseList;
