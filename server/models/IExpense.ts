import mongoose, { Document } from "mongoose";

export interface IExpense extends Document {
    category:string;
    amount:number;
    date:Date;
    user:mongoose.Types.ObjectId;
}

