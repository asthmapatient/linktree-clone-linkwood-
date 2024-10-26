"use client";;
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

const Logout = () => {
  return (
    <button
      onClick={() => {
        signOut({
          redirectTo: "/",
        });
      }}
      className="flex gap-3 items-center shadow-lg p-2 px-3"
    >
      <span>Logout</span>
      <IoIosLogOut className="text-xl" />
    </button>
  );
};

export default Logout;
