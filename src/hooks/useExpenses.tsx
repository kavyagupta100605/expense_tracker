import { Expense } from "../types/Expenses";
import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getExpenses,
  createExpense,
  deleteExpense as deleteExpenseApi,
  updateExpense as updateExpenseApi
} from "../api/expenseApi";
import { useAuth } from "../context/AuthContext";



const useExpenses = () => {
  const {token} = useAuth();
  // console.log("token in useExpenses",token);
  const { data : expenses = [] } = useQuery({
    queryKey: ["expenses",token],
    queryFn: () => getExpenses(token),
    enabled: !!token, // add this line only fetch when token exists
    retry: false,
  });
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: createExpense,
  
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
  const addExpense = (expense: Omit<Expense, "_id">) => {
    addMutation.mutate({ expense, token});
  };
  const [editid,setEditid] = useState<Expense | null>(null);

  const total = expenses.reduce((sum: number, expense: Expense) => sum+ Number(expense.amount),0);
  const deleteMutation = useMutation({
    mutationFn: deleteExpenseApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["expenses"],
      });
    },
  });
  const deleteExpense = (id: string) => {
    deleteMutation.mutate({id,token});
  };

  const updateMutation = useMutation({
    mutationFn: updateExpenseApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
  const updateExpense = (updatedexpense: Expense) =>
  {
    // console.log(updatedexpense);
    updateMutation.mutate({
      id:updatedexpense._id,
      expense:updatedexpense,
      token,
    });
    setEditid(null);
  };
  return {
    expenses,
    addExpense,
    deleteExpense,
    editid,
    setEditid,
    updateExpense,
    total
  };
};

export default useExpenses;
