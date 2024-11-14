import { commentT } from "@/lib/types/comment";
import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema<commentT>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model<commentT>("Comment", commentSchema);
