import { createContext,ReactNode } from "react";
import useExpenses from "../hooks/useExpenses";

const ExpenseContext = createContext<any | undefined>(undefined);

interface ExpenseProviderProps{
    children: ReactNode;
}

export const ExpenseProvider = ({ children } : ExpenseProviderProps) => {
const expenseData = useExpenses();
return (
    <ExpenseContext.Provider value={expenseData}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;

