import mongoose from "mongoose";
import {IUser} from "../models/IUser";

const UserSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
});
export default mongoose.model<IUser>("User", UserSchema);