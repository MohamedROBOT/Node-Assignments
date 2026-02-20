import { Router } from "express";
import {
  checkUserExistence,
  createUser,
  getUserByEmail,
  getUserById,
  updateOrCreateUser,
} from "./user.service.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    await checkUserExistence({ email: req.body.email });
    const user = await createUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user,
      success: true,
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await updateOrCreateUser(id, req.body);
    return res.status(200).json({
      message: "User updated or created successfully",
      user,
      success: true,
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/by-email", async (req, res, next) => {
  try {
    const user = await getUserByEmail({ email: req.query.email });
    return res.status(200).json({
      message: "User retrieved successfully",
      user,
      success: true,
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById( req.params.id );
    return res.status(200).json({
      message: "User retrieved successfully",
      user,
      success: true,
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

export default router;
