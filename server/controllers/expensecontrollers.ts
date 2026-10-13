import mongoose from "mongoose";
import Expense from "../models/ExpenseModel";
import { Request, Response } from "express";

export const createExpense = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // // console.log(req.body);
        // // console.log("Req.user", req.user);

        const expense = await Expense.create({
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date,
            user: new mongoose.Types.ObjectId(req.user.id),
        });

        res.status(201).json(expense);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const expense = await Expense.find({ user: new mongoose.Types.ObjectId(req.user.id) });
        res.json(expense);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json(expense);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json(expense);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message });
    }
};