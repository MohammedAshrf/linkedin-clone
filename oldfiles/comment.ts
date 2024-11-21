import { commentT } from "@/lib/types/comment";
import { model, models, Schema } from "mongoose";

const CommentSchema = new Schema<commentT>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model<commentT>("Comment", CommentSchema);

export { Comment };
