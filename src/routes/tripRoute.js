import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome to trips");
});

router.post("/create-trip", (req, res) => {
  res.send("welcome to trips");
});

export default router;
