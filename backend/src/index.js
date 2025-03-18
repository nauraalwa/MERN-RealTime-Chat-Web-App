import express from "express"; //in package.json, put type: module, so that we're using ES6 (import etc instead of require) instead of commonJS
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"

dotenv.config(); //to access anything inside dotenv file

const PORT = process.env.PORT;

app.use(express.json()); //allow data to be taken as json
app.use(cookieParser()); //allow to parse the cookies to get the value of the jwt token
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})); //allow frontend-backend interaction

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
});

//QORIu3LSG9uoNTJt
//before ? in mongo uri is the database name