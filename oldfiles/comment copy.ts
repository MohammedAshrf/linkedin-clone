import { Document } from "mongoose";
import { userT } from "./user";

// export interface commentDateT {
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface commentT extends Document, commentDateT {
//   _id: string | ObjectId;
//   user: userT;
//   text: string;
// }

export interface commentBaseT {
  user: userT;
  text: string;
}

export interface commentT extends Document, commentBaseT {
  createdAt: Date;
  updatedAt: Date;
}
