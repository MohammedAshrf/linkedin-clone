import { commentT } from "@/lib/types/comment";
import { model, models, Schema } from "mongoose";

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

// Check if the model already exists; if not, create it
export const Comment =
  models.Comment || model<commentT>("Comment", commentSchema);
