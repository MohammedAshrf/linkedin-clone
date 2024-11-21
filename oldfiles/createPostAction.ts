"use server";
import { currentUser } from "@clerk/nextjs/server";
import { userT } from "@/lib/types/user";
import { Post } from "../mongoDB/models.ts/post";
import { addPostRequestT } from "../types/addPostRequest";

export default async function createPostAction(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    throw new Error("You've to sign in first");
  }

  const postInput = formData.get("postInput") as string;
  const image = formData.get("postImage") as File;
  // let imageUrl: string | undefined;

  if (!postInput) {
    throw new Error("You must provide a post input");
  }

  // define user
  const userDB: userT = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  };

  try {
    if (image && image.size > 0) {
      //1.  Upload image if there is one.
      //2. create post in database with the image url
      const body: addPostRequestT = {
        user: userDB,
        text: postInput,
        // imageUrl: image.name,
      };

      await Post.create(body);
    } else {
      // create post in the database

      const body: addPostRequestT = {
        user: userDB,
        text: postInput,
      };

      await Post.create(body);
    }
  } catch (err) {
    throw new Error("Error while creating post: " + err);
  }
  // revalidate "/" - home page
}
