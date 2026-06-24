const user1 = require("../models/user1");




exports.createUser=async (req,res) => {
    try {
        const user = await user1.create(req.body);

        res.status(201).json(user);
    } catch (error){
        res.status(500).json({
            message:error.message,
        });
    }
};
exports.getUsers =  async (req,res) => {
    try {
        const User = await user1.find();
        res.json(User);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.deleteUser = async (req,res) => {
    try {
        const User = await user1.findByIdAndDelete(req.params.id);
        if(!User){
            return res.status(404).json({
                message: "user1 not found",
            });
        }
        res.json(User);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.updateUser = async (req,res) => {
    try{
        const User= await user1.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );
        if(!User){
            return res.status(404).json({
                message:"user1 not found",
            });
        }
        res.json(User);

    }catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
};