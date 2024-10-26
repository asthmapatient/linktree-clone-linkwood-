import ClaimUsernameForm from "@/components/forms/ClaimUsernameForm";
import React from "react";

const page = ({ searchParams }: any) => {
      const desiredUsername = searchParams?.desiredUsername;
  return (
    <div className=" items-center ">
      <h1 className="text-center text-5xl my-10  ">Grab Your username</h1>
      <ClaimUsernameForm desiredUsername={desiredUsername} />
    </div>
  );
};

export default page;
