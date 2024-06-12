import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../api/expenses';

export const useExpenses = () => {
    const queryClient = useQueryClient();

    const { data: expenses, error, isLoading } = useQuery(['expenses'], getExpenses);

    const addExpenseMutation = useMutation(addExpense, {
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    const updateExpenseMutation = useMutation(updateExpense, {
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    const deleteExpenseMutation = useMutation(deleteExpense, {
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    return {
        expenses,
        error,
        isLoading,
        addExpense: addExpenseMutation.mutate,
        updateExpense: updateExpenseMutation.mutate,
        deleteExpense: deleteExpenseMutation.mutate
    };
};
