"use client";;
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const UsernameForm = ({session}:any) => {
  const router = useRouter();
  // const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;

    if (username) {
      if (!session) {
        await signIn("google", {
          redirectTo: `/claim?desiredUsername=${username}`,
        });
      } else {
        router.push(`/claim/?desiredUsername=${username}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center shadow-lg shadow-black/20 pt-5 "
    >
      <span className="bg-white self-stretch py-4 pl-5">LinkWood.to/</span>
      <input
        type="text"
        name="username"
        className="self-stretch"
        placeholder="username"
      />
      <button type="submit" className="bg-blue-500 text-white p-4 px-6">
        Join for free
      </button>
    </form>
  );
};

export default UsernameForm;
