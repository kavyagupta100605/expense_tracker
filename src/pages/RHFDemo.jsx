import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import expenseSchema from "../schemas/expenseSchema";


const RHFDemo = () => {
    const {register,handleSubmit,formState: {errors}} = useForm({resolver: zodResolver(expenseSchema)});
    const onSubmit = (data) => {
        console.log(data);
    };
    // console.log(register("Category"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
  {...register("category")}
/>

{errors.category && (
  <p>{errors.category.message}</p>
)}

<input
  {...register("amount")}
/>

{errors.amount && (
  <p>{errors.amount.message}</p>
)}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default RHFDemo
