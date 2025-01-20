import express from "express";
import {
  registerUsers,
  loginUser,
  searchUser,
  sendNotify,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("welcome to users");
});
router.post("/register", registerUsers);
router.post("/login", loginUser);
router.get("/searchUser", searchUser);
router.get("/notifications", sendNotify);
router.post("/deleteuser", deleteUser);

export default router;
