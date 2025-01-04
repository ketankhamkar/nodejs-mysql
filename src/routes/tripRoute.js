import express from "express";
import { createTrip } from "../controllers/tripController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome to trips");
});

router.post("/create-trip", createTrip);

export default router;
