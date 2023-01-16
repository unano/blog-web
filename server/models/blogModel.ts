

import mongoose, { Mongoose } from "mongoose";

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
            type: mongoose.Types.ObjectId, ref: 'category'
        }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("blog", blogSchema);