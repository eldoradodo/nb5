// src/hooks/useExpenses.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../api/expenses';

export const useExpenses = (month) => {
    const queryClient = useQueryClient();

    const { data: expenses, error, isLoading } = useQuery({
        queryKey: ['expenses', month],
        queryFn: () => getExpenses(month)
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
        deleteExpense: mutationDelete.mutate
    };
};
