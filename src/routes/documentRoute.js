import express from "express";
import { insertDocument } from "../controllers/documentController.js";

const router = express.Router();
router.get("/", (_req, res) => {
  res.send("welcome to documents");
});
router.post("/register-docs", insertDocument);

export default router;
