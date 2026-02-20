import { Router } from "express";
import { addLog } from "./logs.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const result = await addLog(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

export default router;
