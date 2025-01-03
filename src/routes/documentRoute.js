import express from "express";
import { insertDocument } from "../controllers/documentController.js";

const router = express.Router();

router.post("/register-docs", insertDocument);

export default router;
