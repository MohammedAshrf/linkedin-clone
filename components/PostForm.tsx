"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function PostForm() {
  const { user } = useUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const id = user?.id;

  return (
    <div>
      <form action="">
        <div className="flex items-center space-x-2">
          <Avatar>
            {id ? (
              <AvatarImage src={imageUrl} />
            ) : (
              <AvatarImage src={"https://github.com/shadcn.png"} />
            )}
            <AvatarFallback>
              {firstName?.charAt(0)} {lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <input
            type="text"
            name="postInput"
            placeholder="Start writing a post..."
            className="flex-1 outline-none rounded-full py-3 px-4 border"
          />
        </div>
      </form>
    </div>
  );
}
