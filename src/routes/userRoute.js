import express from "express";
import { registerUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUsers);
router.post("/login", loginUser);

export default router;
