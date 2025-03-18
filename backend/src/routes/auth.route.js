import express from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile); //put cuz we want to only update one of the fields
//protectRoute is the middleware, so it validates the user first before allowing it to change its profilepic

router.get("/check", protectRoute, checkAuth) //if logout, no token, will not give user data

export default router;
