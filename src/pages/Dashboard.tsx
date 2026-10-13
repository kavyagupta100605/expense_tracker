import  { useContext } from 'react'
import ExpenseContext from '../context/ExpenseContext'
import { getCategoryTotals } from '../utils/expenseHelpers';
import './dashboard.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
    const {expenses,total} = useContext(ExpenseContext) || {};
    const transactionCount= expenses.length;
    const averageExpense = 
    transactionCount === 0 ? 0:(total/transactionCount).toFixed(2);
    const categoryTotals = getCategoryTotals(expenses);
    const highest=Object.entries(categoryTotals).length !== 0 ? Object.entries(categoryTotals).reduce((acc,current)=>{ 
        return current[1]>acc[1] ? current:acc;
    }) : ["None",0];
    const chartData = Object.entries(categoryTotals).map(([category,amount]) => ({
        name : category,
        value : amount
    })) 
    console.log(chartData);
    const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4"
    ];

    
  return (
    <div className="dashboard-container">
  <h1 className="dashboard-title">
    Expense Dashboard
  </h1>

  <div className="stats-grid">

    <div className="stat-card">
      <h3>Total Expenses</h3>
      <p>₹{total}</p>
    </div>

    <div className="stat-card">
      <h3>Total Expense Count</h3>
      <p>{transactionCount}</p>
    </div>

    <div className="stat-card">
      <h3>Average Expense</h3>
      <p>₹{averageExpense}</p>
    </div>

    <div className="stat-card">
      <h3>Highest Expense Category</h3>
      <p>{highest[0]}</p>
    </div>

    <div className="stat-card highlight-card">
      <h3>Highest Category Amount</h3>
      <p>₹{highest[1]}</p>
    </div>
    <div className="chart-container">
  <h2>Expense Distribution</h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >
    <PieChart>

      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={130}
        label
      >
        {chartData.map((entry, index) => (
          <Cell
            key={index}
            fill={
              COLORS[
                index % COLORS.length
              ]
            }
          />
        ))}
      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>
  </ResponsiveContainer>
</div>

  </div>
</div>
  )
}

export default Dashboard
