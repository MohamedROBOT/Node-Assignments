import { Router } from "express";
import {
  BadRequestException,
  getId,
  NotFoundException,
  SYS_MSG,
} from "../../common/index.js";
import {
  createNote,
  deleteAllNotes,
  deleteNote,
  filterNotes,
  getNote,
  getNotesByAggregate,
  getNoteWithUser,
  replaceNote,
  updateAllNotes,
  updateNote,
} from "./note.service.js";

const router = Router();
router.post("/", async (req, res, next) => {
  const id = getId(req.headers);
  req.body.userId = id;

  await createNote(req.body);
  res.status(200).json({
    message: "note created successfully",
    success: true,
  });
});

router.patch("/:id", async (req, res, next) => {
  const noteId = req.params.id;
  const id = getId(req.headers);
  //error must be checked from old doc not the updated stupid ass
  const note = await getNote({ _id: noteId });
  if (!note) throw new NotFoundException(SYS_MSG.note.notFound);
  if (note.userId.toString() !== id)
    throw new BadRequestException("You're not the owner");

  const updatedNote = await updateNote(
    { $and: [{ _id: { $eq: noteId } }, { userId: { $eq: id } }] },
    req.body,
    { returnDocument: "after" },
  );

  res.status(200).json({
    message: "note updated successfully",
    success: true,
    data: {
      updatedNote,
    },
  });
});

router.put("/:id", async (req, res, next) => {
  const id = getId(req.headers);
  const noteId = req.params.id;
  const note = await getNote({ _id: noteId });
  if (!note) throw new NotFoundException(SYS_MSG.note.notFound);
  if (note.userId.toString() !== id)
    throw new BadRequestException("You're not the owner");
  req.body.userId = id;
  const updatedNote = await replaceNote({ _id: noteId }, req.body, {
    returnDocument: "after",
  });

  res.status(200).json({
    message: "note updated successfully",
    success: true,
    data: {
      updatedNote,
    },
  });
});

router.patch("/", async (req, res, next) => {
  const id = getId(req.headers);
  const updatedNotes = await updateAllNotes({ userId: id }, req.body, {
    returnDocument: "after",
  });
  if (updatedNotes.matchedCount === 0)
    throw new NotFoundException(SYS_MSG.note.notFound);
  res.status(200).json({
    message: "note updated successfully",
    success: true,
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const userId = getId(req.headers);
  const note = await getNote({ _id: id });
  if (note.userId.toString() !== userId)
    throw new BadRequestException("You're not the owner");
  const deletedNote = await deleteNote(id);
  if (!deletedNote) throw new NotFoundException(SYS_MSG.note.notFound);
  res.status(200).json({
    message: "note deleted successfully",
    success: true,
  });
});

router.get("/paginate-sort", async (req, res, next) => {
  const userId = getId(req.headers);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  const notes = await filterNotes({ userId }, {}, {}, skip, limit, {
    createdAt: -1,
  });

  if (notes.length === 0) throw new NotFoundException(SYS_MSG.note.notFound);

  return res.status(200).json({
    message: "notes found successfully",
    success: true,
    data: {
      notes,
    },
  });
});

router.get("/note-by-content", async (req, res, next) => {
  const userId = getId(req.headers);
  //regex for case insensitive
  const note = await getNote({ content: { $regex: req.query.content } });
  if (!note) throw new NotFoundException(SYS_MSG.note.notFound);
  if (note.userId.toString() !== userId)
    throw new BadRequestException("You're not the owner");

  return res.status(200).json({
    message: "note found successfully",
    success: true,
    data: {
      note,
    },
  });
});

router.get("/note-with-user", async (req, res, next) => {
  const userId = getId(req.headers);
  const notes = await getNoteWithUser(
    { userId },
    { title: 1, userId: 1, createdAt: 1 },
  );
  if (!notes) throw new NotFoundException(SYS_MSG.note.notFound);
  return res.status(200).json({
    message: "notes found successfully",
    success: true,
    data: {
      notes,
    },
  });
});

router.get("/aggregate", async (req, res, next) => {
  const userId = getId(req.headers);
  const title = req.query.title;
  const notes = await getNotesByAggregate(userId, title);
  if (notes.length === 0) throw new NotFoundException(SYS_MSG.note.notFound);
  return res.status(200).json({
    message: "note found successfully",
    success: true,
    data: {
      notes,
    },
  });
});
router.get("/:id", async (req, res, next) => {
  const userId = getId(req.headers);
  const id = req.params.id;

  const note = await getNote({ _id: id });
  if (!note) throw new NotFoundException(SYS_MSG.note.notFound);
  if (note.userId.toString() !== userId)
    throw new BadRequestException("You're not the owner");

  return res.status(200).json({
    message: "note found successfully",
    success: true,
    data: {
      note,
    },
  });
});

router.delete("/",async (req, res, next) => {
  const userId = getId(req.headers);
  const deletedNotes = await deleteAllNotes(userId);
const {deletedCount }= deletedNotes;
  if (deletedCount===0) throw new NotFoundException(SYS_MSG.note.notFound);
  res.status(200).json({
    message: "notes deleted successfully",
    success: true,
  });
});
export default router;
