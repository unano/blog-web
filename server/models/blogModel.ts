
import mongoose, { Mongoose } from "mongoose";
import { IBlog } from "../config/interface";

const blogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    content: {
      type: String,
      required: true,
      minLength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 200,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    thumbs: [{ user_id: { type: mongoose.Types.ObjectId, ref: "user" } }],
    thumbs_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBlog>("blog", blogSchema);
///unano