import {Expense} from "../types/Expenses";

export const getCategoryTotals = (expenses: Expense[]) => {
    return expenses.reduce((acc: Record<string, number>, expense: Expense) => {
        if(acc[expense.category]){
            acc[expense.category] += Number(expense.amount);
        }
        else{
            acc[expense.category] = Number(expense.amount);
        }
        return acc;
    },{});
};