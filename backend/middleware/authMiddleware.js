const jwt = require("jsonwebtoken");
const verifyToken = async(req,res)=>{
    
    if(req){
        jwt.verify(req, process.env.JWT_SECRET);
        return true;
    }else{
        return res.status(400).json({ message: "Invalid token" })
    }
}
 

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        // If the header is missing or doesn't start with "Bearer", return an access denied response
        return res.status(401).json({ message: "Access denied. No token provided." });
    }


    try {
        const token = authHeader.split(" ")[1];
        const verified = verifyToken(token)

        req.user = verified;
        // Checking if the user has access to the current path
        if (verified) {
            // If the user has access, continue to the next middleware
            return next();
        } else {
            // If the user does not have access, return an unauthorized response
            return res.status(400).json({ message: "Invalid token" })
        }
    } catch (error) {
        console.log("Error from middleware: ", error);

        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = { authenticate , verifyToken};
