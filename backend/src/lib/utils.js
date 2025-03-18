import jwt from "jsonwebtoken";

//userId is the req here
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //in miliseconds
        httpOnly: true, //prevent XSS attacks, cross-site scripting attacks
        sameSite: "strict", //CSRF attacks, cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development", //turning it into https instead of http, but in localhost its http
    });

    return token;
};

//JSON Web Tokens JWTs are a secure way to transmit information between two parties, such as a client and a server. 
//in here we're sending JWT in cookies