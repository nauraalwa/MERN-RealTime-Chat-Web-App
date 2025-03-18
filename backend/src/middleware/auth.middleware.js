import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => { //next is the next function is the user is validated, in this case is the updateProfile
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" }) //whether cookie exists
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode the value of cookie to get the userID, cuz thas what we're storing there, and cuz value of cookie is gibberish (can see in postman)
        
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" }) //if not a userID
        };

        const user = await User.findbyId(decoded.userId).select("-password"); //- means deselect, so that the password is not sent to the client

        if(!user) {
            return res.status(404).json({ message: "User not found" }); //if the userID not in the database
        };

        req.user = user;

        next(); //move to the next function (updateProfilePic) if passed validation
    } catch (error) { 
        console.log("error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};