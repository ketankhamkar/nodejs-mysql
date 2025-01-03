import express from "express";
const router = express.Router();

router.post("create-trip", () => {
  console.log("create trip");
});

export default router;
