import { Model } from "mongoose";
import { commentT } from "./comment";
import { userT } from "./user";
import { ObjectId } from "mongoose";

export interface postDateT {
  createdAt: Date;
  updatedAt: Date;
}

export interface postT extends Document, postDateT {
  _id: string | ObjectId;
  user: userT;
  text: string;
  imageUrl?: string;
  comments?: commentT[];
  likes?: string[];
}

// export interface postBaseT {
//   user: userT;
//   text: string;
// }

// export interface postT extends Document, postBaseT {
//   createdAt: Date;
//   updatedAt: Date;
// }

// Define the document methods (for each instance of a post)
interface postMethodsT {
  likePost(userId: string): Promise<void>;
  unLikePost(userId: string): Promise<void>;
  commentOnPost(comment: commentT): Promise<void>;
  getAllComments(): Promise<commentT[]>;
}

interface postStaticsT {
  getAllPosts(): Promise<postDocumentT[]>;
}

// Singular instance of a post
export interface postDocumentT extends postT, postMethodsT {}

// all posts
export interface postModelT extends postStaticsT, Model<postDocumentT> {}
