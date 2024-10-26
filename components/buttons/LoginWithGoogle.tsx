"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginWithGoogle = () => {
  return (
    <button
      onClick={() => {
        signIn("google", {
          redirectTo: "/account",
        });
      }}
      className="bg-white shadow-lg text-center w-full py-4 rounded-md flex gap-4 items-center justify-center"
    >
      <FcGoogle className="text-3xl" />
      <span>Sign In with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
