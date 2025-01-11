import express from "express";
import {
  registerUsers,
  loginUser,
  searchUser,
  sendNotify,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("welcome to users");
});
router.post("/register", registerUsers);
router.post("/login", loginUser);
router.get("/searchUser", searchUser);
router.get("/notifications", sendNotify);

export default router;
