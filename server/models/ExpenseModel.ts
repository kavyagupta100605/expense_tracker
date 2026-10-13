import mongoose from "mongoose";
import { IExpense } from "../models/IExpense";

const ExpenseSchema = new mongoose.Schema<IExpense>({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model<IExpense>("Expense", ExpenseSchema);