import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("You called me bro!");
});

export default router;
