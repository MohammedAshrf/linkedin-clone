"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

export default function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const id = user?.id;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  }

  return (
    <div>
      <form ref={ref} action="">
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

          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />

          <button type="submit" hidden>
            Post
          </button>
        </div>

        {/* Preview conditional check */}
        <div>
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            Add
          </Button>

          {/* Add a remove preview button */}
        </div>
      </form>
    </div>
  );
}
