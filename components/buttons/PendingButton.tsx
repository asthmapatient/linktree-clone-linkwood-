import React from "react";
import { useFormStatus } from "react-dom";

const PendingButton = ({ type, pendingText, defaultText }: any) => {
  const { pending } = useFormStatus(); // `pending` is true while the form is submitting
  return (
    <button
      type={type}
      className={`p-2 rounded-xl text-white self-stretch ${
        pending ? "bg-gray-400" : "bg-blue-500"
      }`}
      disabled={pending} // Disable button during pending state
    >
      {pending ? pendingText : defaultText}
    </button>
  );
};

export default PendingButton;
