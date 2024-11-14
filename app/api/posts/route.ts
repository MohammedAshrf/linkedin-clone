import { NextResponse } from "next/server";

export async function POST(request: Request) {}

export async function GET(request: Request) {
  try {
  } catch (err) {
    return NextResponse.json(
      { "An error occured while fetching posts ": err },
      { status: 500 }
    );
  }
}
