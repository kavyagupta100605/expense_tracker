const jwt = require("jsonwebtoken");

const protect = async (req,res,next) => {
    try{
        // get token from header
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"No token, unauthorized"});

        }
        //extract token (remove bearer prefix)
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user id to request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message : "Invalid token "});
    }
};

module.exports = protect;