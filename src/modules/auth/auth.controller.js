import { Router } from "express";
import { checkUserExistence } from "../user/user.service.js";
import {
  BadRequestException,
  compare,
  ConflictException,
  encryption,
  generateToken,
  hash,
  SYS_MSG,
} from "../../common/index.js";
import userRepository from "../../DB/models/user/user.repository.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  //get data from request
  let { email, phone, password } = req.body;
  //check user existence
  const user = await checkUserExistence({
    $or: [
      { email: { $eq: email, $ne: null, $exists: true } },
      { phone: { $eq: phone, $ne: null, $exists: true } },
    ],
  });

  if (user) throw new ConflictException(SYS_MSG.user.alreadyExist);
  //encryption
  req.body.password = await hash(password);
  if (phone) req.body.phone = encryption(phone);
  //create user
  const createdUser = await userRepository.create(req.body);
  //send response
  res.status(201).json({
    message: SYS_MSG.user.created,
    success: true,
  });
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  //check user existence
  const user = await checkUserExistence({
    email: { $eq: email, $ne: null, $exists: true },
  });
  const isPasswordMatch = await compare(
    password,
    user?.password ||
      "$2b$12$.X5ACJKDbEdS5oIAkRV0nOH2IpcLMfPlyvCFeZTd0c0XDmF0wueFq",
  );
  if (!user) throw new BadRequestException("invalid credentials");
  if (!isPasswordMatch) throw new BadRequestException("invalid credentials");

  const token = generateToken(user);
  res.status(200).json({
    message: "login successfully",
    token,
  });
});
export default router;
