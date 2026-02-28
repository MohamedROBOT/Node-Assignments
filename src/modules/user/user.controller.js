import { Router } from "express";
import {
  ConflictException,
  decryption,
  encryption,
  NotFoundException,
  SYS_MSG,
  verifyToken,
} from "../../common/index.js";
import { checkUserExistence, deleteUser, updateUser } from "./user.service.js";
const router = Router();

router.patch("/", async (req, res, next) => {
  const { token } = req.headers;
  const { id } = verifyToken(token);

  const user = await checkUserExistence({
    email: { $eq: req.body.email, $ne: null, $exists: true },
    _id: { $ne: id },
  });
  if (user) throw new ConflictException(SYS_MSG.user.alreadyExist);
  if (req.body.phone) req.body.phone = encryption(req.body.phone);
  const updatedUser = await updateUser({ _id: id }, req.body, {
    returnDocument: "after",
    projection: { password: 0 },
  });
  updatedUser.phone = decryption(updatedUser.phone);
  res.status(200).json({
    message: "user updated successfully",
    user: updatedUser,
  });
});

router.delete("/", (req, res, next) => {
  const { token } = req.headers;
  const { id } = verifyToken(token);

  const deletedUser = deleteUser(id);
  return res.status(200).json({
    success: true,
    message: SYS_MSG.user.deleted,
  });
});

router.get("/", async (req, res, next) => {
  const { token } = req.headers;
  const { id } = verifyToken(token);
  const user = await checkUserExistence({
    _id: { $eq: id },
  });
  if (!user) throw new NotFoundException(SYS_MSG.user.notFound);

  res.status(200).json({
    message: "user found successfully",
    success: true,
    data: { user },
  });
});
export default router;
