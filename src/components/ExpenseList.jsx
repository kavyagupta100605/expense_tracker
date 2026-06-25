import React, { useContext, useState, useEffect, useRef } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import './ExpenseList.css';

const ExpenseList = () => {
    const { expenses, deleteExpense, setEditid } = useContext(ExpenseContext);
    const tableRef = useRef(null);
    const dtRef = useRef(null);

    // Filter states
    const [filter, setFilter] = useState("All");
    const categories = ["All", ...new Set(expenses.map((expense) => expense.category))];
    const filteredExpenses = filter === "All" 
        ? expenses 
        : expenses.filter((expense) => expense.category === filter);

    useEffect(() => {
        // Initialize DataTables
        if (tableRef.current) {
            // Destroy existing instance before re-initializing
            if (dtRef.current) {
                dtRef.current.destroy();
            }
            dtRef.current = new DataTable(tableRef.current, {
                destroy: true,
                retrieve: true,
                responsive: true,
                // Optional: We can disable DataTables own search if we only want our category dropdown
                // searching: false,
            });
        }

        return () => {
            // Clean up DataTables on unmount or before re-initialization
            if (dtRef.current) {
                dtRef.current.destroy();
                dtRef.current = null;
            }
        };
    }, [filteredExpenses]);

    return (
        <div>
            <div className="filter-wrapper">
                <div className="filter-container">
                    <label className="filter-label">Filter by Category</label>
                    <select
                        className="filter-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div key={JSON.stringify(filteredExpenses)}>
                <table ref={tableRef} className="display" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Category</th>
                        <th style={{ textAlign: 'left' }}>Amount</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense) => (
                        <tr key={expense._id}>
                            <td>{expense.category}</td>
                            <td>₹{expense.amount}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button
                                    className="action-btn edit"
                                    onClick={() => setEditid(expense)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => deleteExpense(expense._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExpenseList;
