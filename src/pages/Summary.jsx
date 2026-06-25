import "./summary.css";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { getCategoryTotals } from "../utils/expenseHelpers";

const Summary = () => {
  const { expenses,total } = useContext(ExpenseContext);

//   const total = expenses.reduce(
//     (sum, expense) => sum + Number(expense.amount),
//     0
//   );
    const categoryTotals = getCategoryTotals(expenses);
  return (
    <div className="summary-container">
      <h1 className="summary-title">
        Expense Summary
      </h1>

      <div className="total-card">
        <h2>Total Expenses: ₹{total}</h2>
      </div>

      <div className="summary-list">
        {Object.entries(categoryTotals).map(([category,amount]) => (
          <div
            key={category}
            className="summary-item"
          >
            <h3>{category}</h3>

            <p>₹{amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;