import axios from "axios";
import { Expense } from "../types/Expenses";

const api_url = "http://localhost:5000/expenses";
export const getExpenses = async (token: string | null) => {
    // console.log("token in getExpenses:", token);  // add this
    const response = await axios.get<Expense[]>(api_url,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
export const createExpense = async ({expense, token} : {expense: Omit<Expense, "_id">, token: string | null}) => {
    console.log(expense,token);
    const response = await axios.post<Expense>(api_url,expense,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
export const deleteExpense = async ({id,token} : {id: string, token: string | null}) => {
    const response = await axios.delete<Expense>(`${api_url}/${id}`,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
export const updateExpense = async ({id,expense,token} : {id: string, expense: Expense, token: string | null}) => {
    const response = await axios.put<Expense>(`${api_url}/${id}`,expense,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
