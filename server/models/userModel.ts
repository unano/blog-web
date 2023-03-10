
import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your username"],
      trim: true,
      maxLength: [20, "your name is up to 20 chars long"],
    },
    account: {
      type: String,
      required: [true, "Please add your email or phone"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/drspqpjo3/image/upload/v1657433630/defaluts/default_himttk.png",
    },
    role: {
      type: String,
      default: "user",
    },
    type: {
      type: String,
      default: "register",
    },
    rf_token: { type: String },
    followings: { type: [{ type: mongoose.Types.ObjectId, ref: "user" }], default: [] },
    following_num: { type: Number, default: 0},
    followers: { type: [{ type: mongoose.Types.ObjectId, ref: "user" }], default: [] },
    follower_num: { type: Number , default: 0},
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IUser>("user", userSchema);