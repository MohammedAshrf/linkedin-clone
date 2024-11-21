"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { ImageIcon, XIcon } from "lucide-react";
import createPostAction from "@/lib/actions/createPostAction";

export default function PostForm() {
  const ref = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;
  const id = user?.id;

  // not a server action but a helper function
  async function handlePostAction(formData: FormData) {
    const formDataCopy = formData;
    ref.current?.reset();

    const text = formDataCopy.get("postInput") as string;
    // const image = formDataCopy.get("postImage") as File | null;

    if (!text.trim()) {
      throw new Error("You must provide a post input");
    }

    setPreview(null);

    try {
      await createPostAction(formDataCopy);
    } catch (err) {
      console.log("Error while creating post: " + err);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    }
  }

  return (
    <div className="mb-2 mx-2">
      <form
        ref={ref}
        action={(FormData) => {
          // handle form submission with server action
          handlePostAction(FormData);

          // Toast notification based on the promise above
        }}
        className="p-3 bg-white rounded-lg border"
      >
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
        {preview && (
          <div className="mt-2">
            <img src={preview} alt="preview" className="w-full object-cover" />
          </div>
        )}
        <div className="flex justify-end mt-2 space-x-2">
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="mr-2" size={16} color="currentColor" />
            {preview ? "Change" : "Add"} image
          </Button>

          {/* Add a remove preview button */}
          {preview && (
            <Button
              type="button"
              variant={"outline"}
              className="bg-red-600 hover:bg-red-500"
              onClick={() => setPreview(null)}
            >
              <XIcon className="mr-2" size={16} color="white" />
              <p className="text-white">remove image</p>
            </Button>
          )}
        </div>
      </form>
      <hr className="mt-2 border-gray-300" />
    </div>
  );
}
