"use client";

import { claimUsername } from "@/actions/claimUsernameAction";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import PendingButton from "../buttons/PendingButton";
import { useRouter } from "next/navigation";

const inputData = [
  {
    type: "text",
    name: "username",
    placeholder: "enter a Username",
  },
];

const ClaimUsernameForm = ({ desiredUsername }: any) => {
  const router = useRouter();
  const [state, formAction] = useFormState(claimUsername, {
    success: false,
    error: undefined,
  });

  useEffect(() => {
    if (state.success) {
      router.push("/account");
    }
  }, [state]);
  // console.log("pending", pending);
  return (
    <form
      action={formAction}
      className="max-w-xs mx-auto flex flex-col items-center gap-5 justify-center"
    >
      <input
        type="text"
        name="username"
        className="self-stretch p-2 text-center"
        defaultValue={desiredUsername}
        // disabled={pending} // Disable input when form is pending
      />
      <PendingButton
        type={"submit"}
        defaultText={"claim your username"}
        pendingText={"Claiming.."}
      />

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
};

export default ClaimUsernameForm;
