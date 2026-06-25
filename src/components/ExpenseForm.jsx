import React, { useState,useContext,useRef, useEffect } from 'react';
import ExpenseContext from '../context/ExpenseContext';
import "./ExpenseForm.css";


const ExpenseForm = () => {
  const {addExpense,editid,updateExpense} = useContext(ExpenseContext);  
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const categoryRef = useRef(null);

  useEffect(() => {
    if(editid){
        setAmount(editid.amount);
        setCategory(editid.category);
    }
  },[editid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!editid){

        if (!category || !amount) return;

        const newExpense = {
        category,
        amount,
        date: new Date(),
        };

        addExpense(newExpense);
    }
    else
    {
        const newExpense = {
        _id:editid._id,
        category,
        amount,
        date: editid.date,
        };
        updateExpense(newExpense);
    }

    setCategory("");
    setAmount("");

    categoryRef.current.focus();
  };

  return (
    <form
      className="expense-form"
      onSubmit={handleSubmit}
    >
      <input
      ref={categoryRef}
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <button
        className="add-btn"
        type="Submit"
      >
        {editid ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;