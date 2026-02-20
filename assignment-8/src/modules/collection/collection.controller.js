import { Router } from "express";
import {
  createBooksCollIndex,
  createCappedCollection,
  createExplicitCollection,
  createImplicitCollection,
} from "./collection.service.js";

const router = Router();

router.post("/books", async (req, res, next) => {
  try {
    const result = await createExplicitCollection();

    return res.status(201).json({
      success: true,
      message: "collection created successfully",
      result,
    });
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.post("/authors", async (req, res, next) => {
  try {
    const result = await createImplicitCollection(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});

router.post("/logs/capped", async (req, res, next) => {
  try {
    const result = await createCappedCollection();

    return res.status(201).json({
      message: "collection created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
export default router;

router.post("/books/index", async (req, res, next) => {
  try {
    const result = await createBooksCollIndex();

    return res.status(201).json({
      message: "Index created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.cause || 500).json({ message: error.message });
  }
});
