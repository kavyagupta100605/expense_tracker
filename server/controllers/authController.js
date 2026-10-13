const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req,res) =>{
    try{
        // console.log(req.body);
        const {name,email,password} = req.body;
         //check if duplicate mail exists
         const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email Already Registered"});
        }

        //Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // 3. Save user to DB
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 4. Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //Send Responses
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email:user.email
            }
        });
    } catch (error){
        const message = error instanceof Error ? error.message:"Unknown error";
        res.status(500).json({message: "server error" , error: message});
    };
};



const login = async (req,res) => {
    try{
        const { email,password } = req.body;

        //check if user exists
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //compsre Password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
         // 3. Create JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 4. Send response
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error){
        res.status(500).json({message:"server error",error: error.message});
    }
};

module.exports = {register,login};