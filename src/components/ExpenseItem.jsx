import { useContext } from 'react';
import './ExpenseItem.css';
import ExpenseContext from '../context/ExpenseContext';
const ExpenseItem = ({ expense,deleteExpense }) => {
    const {setEditid} = useContext(ExpenseContext);
  return (
    <div className="expense-card">
  <div className="expense-info">
    <h3>{expense.category}</h3>
    <p>₹{expense.amount}</p>
  </div>

  <button
    className="delete-btn"
    onClick={() => deleteExpense(expense._id)}
  >
    Delete
  </button>
  <button
    className="delete-btn"
    onClick={() => setEditid(expense)}
  >
    Edit
  </button>
</div>
  );
};

export default ExpenseItem;