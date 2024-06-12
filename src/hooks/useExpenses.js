import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../api/expenses';

export const useExpenses = () => {
    const queryClient = useQueryClient();

    const { data: expenses, error, isLoading } = useQuery({
        queryKey: ['expenses'],
        queryFn: getExpenses,
    });

    const addExpenseMutation = useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    const updateExpenseMutation = useMutation({
        mutationFn: updateExpense,
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        }
    });

    const deleteExpenseMutation = useMutation({
        mutationFn: deleteExpense,
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
