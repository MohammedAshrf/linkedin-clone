import { userT } from "./user";

export interface addPostRequestT {
  user: userT;
  text: string;
  imageUrl?: string;
}
