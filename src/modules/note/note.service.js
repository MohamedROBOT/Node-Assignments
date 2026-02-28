import mongoose from "mongoose";
import { Note, noteRepository } from "../../DB/index.js";

export const createNote = async (noteData) => {
  return await noteRepository.create(noteData);
};

export const updateNote = async (filter, update, options) => {
  return await noteRepository.update(filter, update, options);
};

export const replaceNote = async (filter, replacement, options) => {
  return await noteRepository.getAndReplace(filter, replacement, options);
};

export const updateAllNotes = async (filter, update, options) => {
  return await noteRepository.updateMany(filter, update, options);
};

export const deleteNote = async (noteId) => {
  return await noteRepository.deleteById(noteId);
};

export const getNote = async (filter) => {
  return await noteRepository.getOne(filter);
};

export const getNoteWithUser = async (filter, projection) => {
  return await Note.find(filter, projection).populate({
    path: "userId",
    select: "email -_id",
  });
};

export const filterNotes = async (
  filter,
  projection,
  options,
  skip,
  limit,
  sort,
) => {
  return await noteRepository.getMany(
    filter,
    projection,
    options,
    skip,
    limit,
    sort,
  );
};

export const getNotesByAggregate = async (userId, title) => {
  const objectUserId = new mongoose.Types.ObjectId(userId);
  const pipeline = [
    {$match: {userId: objectUserId}},
   ...(title
      ? [
          {
            $match: {
              title: { $regex: title, $options: "i" },
            },
          },
        ]
      : []),
    {$lookup: {from:"users",localField: "userId", foreignField:"_id", as : "user"}},
    {$unwind: "$user"},
    {$project:{
      _id:0,
      title:1,
      content:1,
      createdAt:1,
      user:{
        name:1,
        email:1
      }
    }}
  ]
  return await noteRepository.aggregate(pipeline);
};


export const deleteAllNotes = (userId)=>{
  return noteRepository.deleteMany({userId})
}