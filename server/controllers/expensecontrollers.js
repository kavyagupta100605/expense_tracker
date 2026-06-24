const Expense = require("../models/Expense");




exports.createExpense=async (req,res) => {
    try {
        console.log(req.body);
        console.log("Req.user",req.user);
        const expense = await Expense.create({
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date,
            user: req.user.id
        });

        res.status(201).json(expense);
    } catch (error){
        console.log(error.message);
        res.status(500).json({
            message:error.message,
        });
    }
};
exports.getExpenses =  async (req,res) => {
    try {
        const expense = await Expense.find({user:req.user.id});
        res.json(expense);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteExpense = async (req,res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if(!expense){
            return res.status(404).json({
                message: "Expense not found",
            });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateExpense = async (req,res) => {
    try{
        const expense= await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );
        if(!expense){
            return res.status(404).json({
                message:"Expense not found",
            });
        }
        res.json(expense);

    }catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
};