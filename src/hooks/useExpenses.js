import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:5000/expenses';

// 지출 항목 가져오기
const getExpenses = async (month) => {
    const response = await axios.get(`${BASE_URL}?month=${month}`);
    return response.data;
};

// 지출 항목 추가
export const addExpense = async (expense) => {
    const response = await axios.post(BASE_URL, expense);
    return response.data;
};

// 지출 항목 수정
const updateExpense = async (updatedExpense) => {
    const response = await axios.put(`${BASE_URL}/${updatedExpense.id}`, updatedExpense);
    return response.data;
};

// 지출 항목 삭제
const deleteExpense = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};

export const useExpenses = (month) => {
    const queryClient = useQueryClient();

    const { data: expenses, error, isLoading } = useQuery({
        queryKey: ['expenses', month],
        queryFn: () => getExpenses(month),
    });

    const mutationAdd = useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    const mutationUpdate = useMutation({
        mutationFn: updateExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    const mutationDelete = useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    return {
        expenses,
        error,
        isLoading,
        addExpense: mutationAdd.mutate,
        updateExpense: mutationUpdate.mutate,
        deleteExpense: mutationDelete.mutate,
    };
};
