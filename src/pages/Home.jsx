// import React, { useState,useContext } from 'react';
// import ExpenseContext from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import '../App.css';
import { useContext } from 'react';
import ExpenseContext from '../context/ExpenseContext';

const Home = () => {
    // const {total} = useContext(ExpenseContext)
  return (
   <div className="container">
        <div className='tracker-card'>
            <h1 className="page-title">Expense Tracker</h1>
            <section>
                <h2>Add Expense</h2>
            </section>
            <ExpenseForm/>
            <section>
                <h2>Expenses</h2>
                <ExpenseList/>
            </section>
        </div>
    </div>
  )
}

export default Home
