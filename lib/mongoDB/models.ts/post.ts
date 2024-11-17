import { commentT } from "@/lib/types/comment";
import { postDocumentT, postModelT } from "@/lib/types/post";
import { model, models, Schema } from "mongoose";
import { Comment } from "./comment";

const postSchema = new Schema<postDocumentT>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    text: { type: String, required: true },
    imageUrl: { type: String },
    comments: { type: [Schema.Types.ObjectId], ref: "comment", default: [] },
    likes: { type: String },
  },
  { timestamps: true }
);

postSchema.methods.likePost = async function (userId: string) {
  try {
    await this.updateOne({ $addToSet: { likes: userId } });
  } catch (err) {
    console.log("error while liking post " + err);
  }
};

postSchema.methods.unLikePost = async function (userId: string) {
  try {
    await this.updateOne({ $pull: { likes: userId } });
  } catch (err) {
    console.log("error while unliking post " + err);
  }
};

postSchema.methods.removePost = async function () {
  try {
    await this.model("Post").deleteOne({ _id: this._id });
  } catch (err) {
    console.log("error while removing post ", err);
  }
};

postSchema.methods.commentOnPost = async function (commentToAdd: commentT) {
  try {
    const comment = await Comment.create(commentToAdd);
    this.comments.push(comment._id);
    await this.save();
  } catch (err) {
    console.log("error while commenting on post ", err);
  }
};

postSchema.methods.getAllComments = async function () {
  try {
    await this.populate({
      path: "comments",
      // sort comments by newest first
      optoins: { sort: { createdAt: -1 } },
    });
    return this.comments;
  } catch (err) {
    console.log("error while getting all comments ", err);
  }
};

postSchema.statics.getAllPosts = async function () {
  try {
    const posts = await this.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        // sort comments by newest first
        optoins: { sort: { createdAt: -1 } },
      })
      .lean(); // lean() to convert mongoose objects to plain js objects
    return posts.map((post: postDocumentT) => ({
      ...post,
      _id: post._id.toString(),
      comments: post.comments?.map((comment: commentT) => ({
        ...comment,
        _id: comment._id.toString(),
      })),
    }));
  } catch (err) {
    console.log("error while getting all posts ", err);
  }
};

export const Post =
  (models.Post as unknown as postModelT) ||
  model<postDocumentT, postModelT>("Post", postSchema);
