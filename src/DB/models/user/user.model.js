import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [60, "Age must be less or equal 60"],
    },
  },
  {
    strict: true,
    versionKey: false
  },
);
const User = mongoose.models.User || mongoose.model("User", schema);
export default User;
