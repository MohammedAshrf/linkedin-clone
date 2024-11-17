import { connectDB } from "@/lib/mongoDB/db";
import { Post } from "@/lib/mongoDB/models.ts/post";
import { addPostRequestT } from "@/lib/types/addPostRequest";
import { postT } from "@/lib/types/post";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // => protect the route with clerk authenticatio
  auth();

  try {
    await connectDB();

    const { user, text, imageUrl }: addPostRequestT = await request.json();
    const postData: postT = {
      user,
      text,
      ...(imageUrl ? { imageUrl } : {}),
    };
    const post = await Post.create(postData);

    return NextResponse.json({ "successfully created the post": post });
  } catch (err) {
    return NextResponse.json(
      { "An error occured while fetching posts ": err },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();
    // const posts = await Post.getAllPosts();
    const posts = (Post.getAllPosts = function () {
      return this.find({}); // returns all posts
    });
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json(
      { "An error occured while fetching posts ": err },
      { status: 500 }
    );
  }
}
