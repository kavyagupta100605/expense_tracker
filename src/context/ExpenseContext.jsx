import { createContext } from "react";
import useExpenses from "../hooks/useExpenses";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
const expenseData = useExpenses();

    


  return (
    <ExpenseContext.Provider value={expenseData}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;

