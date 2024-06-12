import axios from 'axios';

const BASE_URL = 'http://localhost:5000/expenses';

// 모든 지출 항목 가져오기
export const getExpenses = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// 지출 항목 추가
export const addExpense = async (expense) => {
    const response = await axios.post(BASE_URL, expense);
    return response.data;
};

// 지출 항목 업데이트
export const updateExpense = async (id, expense) => {
    const response = await axios.put(`${BASE_URL}/${id}`, expense);
    return response.data;
};

// 지출 항목 삭제
export const deleteExpense = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
