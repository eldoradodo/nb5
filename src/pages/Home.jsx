import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseList from '../components/ExpenseList';
import CreateExpense from '../components/CreateExpense';
import MonthNavigation from '../components/MonthNavigation';

const Home = () => {
    const [selectedMonth, setSelectedMonth] = useState(1);
    const { expenses, error, isLoading, addExpense, updateExpense, deleteExpense } = useExpenses(selectedMonth);

    const filteredExpenses = expenses ? expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() + 1 === selectedMonth;
    }) : [];

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

                <MonthNavigation month={selectedMonth} setMonth={setSelectedMonth} />
                <CreateExpense addExpense={addExpense} />
                <ExpenseList
                    expenses={filteredExpenses}
                    updateExpense={updateExpense}
                    deleteExpense={deleteExpense}
                />
            </div>
        </div>
    );
};

export default Home;
