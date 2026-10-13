import { useContext, useState, useEffect, useRef } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import './ExpenseList.css';
import { Expense } from '../types/Expenses';

const ExpenseList = () => {
    const { expenses = [], deleteExpense, setEditid } = useContext(ExpenseContext) || {};
    const tableRef = useRef<HTMLTableElement>(null);
    const dtRef = useRef<any>(null);

    // Filter states
    const [filter, setFilter] = useState<string>("All");
    const safeExpenses: Expense[] = Array.isArray(expenses) ? expenses : [];
    
    const categories = ["All", ...Array.from(new Set(safeExpenses.map((expense: Expense) => expense.category)))];
    const filteredExpenses = filter === "All"
        ? safeExpenses
        : safeExpenses.filter((expense: Expense) => expense.category === filter);

    useEffect(() => {
        if (tableRef.current) {
            if (dtRef.current) {
                try {
                    dtRef.current.destroy();
                } catch (e) {
                    // Ignore destroy errors
                }
                dtRef.current = null;
            }

            try {
                dtRef.current = new DataTable(tableRef.current, {
                    destroy: true,
                    retrieve: true,
                    responsive: true,
                } as any);
            } catch (e) {
                console.error("Error initializing DataTable:", e);
            }
        }

        return () => {
            if (dtRef.current) {
                try {
                    dtRef.current.destroy();
                } catch (e) {
                    // Ignore destroy errors
                }
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
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value)}
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
                        {filteredExpenses.map((expense: Expense) => (
                            <tr key={expense._id || Math.random().toString()}>
                                <td>{expense.category}</td>
                                <td>₹{expense.amount}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        className="action-btn edit"
                                        onClick={() => setEditid && setEditid(expense)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn delete"
                                        onClick={() => deleteExpense && deleteExpense(expense._id)}
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