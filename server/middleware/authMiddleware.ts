import jwt from "jsonwebtoken";
import  { Request,Response,NextFunction } from "express";

const protect = async (req:Request,res:Response,next:NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"No token, unauthorized"});
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET ?? "");

        req.user = decoded as any;
        next();


    } catch (error) {
        return res.status(401).json({message : "Invalid token "});    }
}
export default protect;