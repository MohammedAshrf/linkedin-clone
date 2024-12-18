import connectDB from "@/lib/mongoDB/db";
import { IPostBase, Post } from "@/lib/mongoDB/models.ts/post";
import { IUser } from "@/lib/types/user";
import { NextResponse } from "next/server";

export interface AddPostRequestBody {
  user: IUser;
  text: string;
  imageUrl?: string | null;
}

export async function POST(request: Request) {
  //  auth().protect();
  const { user, text, imageUrl }: AddPostRequestBody = await request.json();

  try {
    await connectDB();

    const postData: IPostBase = {
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
  } catch (error) {
    // return NextResponse.json(
    //   { error: "An error occurred while fetching posts" + error },
    //   { status: 500 }
    // );

    // console.error("Error while fetching posts:", error); // Log the error to debug
    // return new Response(
    //   JSON.stringify({ error: "An error occurred while fetching posts" }),
    //   {
    //     status: 500,
    //   }
    // );

    return NextResponse.json(
      { error: `An error occurred while fetching posts ${error}` },
      { status: 500 }
    );
  }
}
