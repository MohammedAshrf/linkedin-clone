import connectDB from "@/lib/mongoDB/db";
import { Post } from "@/lib/mongoDB/models.ts/post";
import { addPostRequestT } from "@/lib/types/addPostRequest";
import { postBaseT } from "@/oldfiles/post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  //  auth().protect();
  const { user, text, imageUrl }: addPostRequestT = await request.json();

  try {
    await connectDB();

    const postData: postBaseT = {
      user,
      text,
      ...(imageUrl && { imageUrl }),
    };

    const post = await Post.create(postData);
    return NextResponse.json({ message: "Post created successfully", post });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred while creating the post ${error}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.getAllPosts();

    return NextResponse.json(posts);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json(
      { err: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}
