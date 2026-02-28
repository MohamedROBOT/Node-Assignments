import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return /^([A-Z][a-z]*)(\s[A-Z][a-z]*)*$/.test(value);
        },
        message:
          "Each word must start with uppercase and rest lowercase (e.g., 'First Note')",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
  },
);

const Note = mongoose.models.Note || mongoose.model("Note", schema);

export default Note;