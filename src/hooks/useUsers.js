import React from 'react'

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

const useUsers = () => {
    const { data : users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: getExpenses,
    });
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: createExpense,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });
    const addUser = (user) => {
        addMutation.mutate(user);
    };
    const updateMutation = useMutation({
        mutationFn: updateExpenseApi,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });
     const updateExpense = (updatedexpense) =>{
        updateMutation.mutate({
        id:updatedexpense._id,
        expense:updatedexpense,
    });
  };
  const deleteMutation = useMutation({
    mutationFn: deleteExpenseApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["user"],
      });
    },
  });
  const deleteExpense = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <div>
      
    </div>
  )
}

export default useUsers
