"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import PendingButton from "../buttons/PendingButton";
import { updateButton } from "@/actions/getPage";
import toast from "react-hot-toast";
export const buttons = [
  { key: "discord", label: "Discord", icon: FaDiscord },
  { key: "linkdin", label: "Linkedin", icon: FaLinkedin },
  { key: "mail", label: "E-Mail", icon: GoMail },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
];
const PageButtonsForm = ({ page, session }: any) => {
  const pageButton = Object.keys(page?.buttons);

  const pageButtonData = buttons.filter((b1) => {
    return pageButton.includes(b1.key);
  });
  const [activeButtons, setActiveButtons] = useState<any>(pageButtonData || []);
  const handleAddButton = (button: any) => {
    setActiveButtons((prev: any) => {
      return [...prev, button];
    });
  };
  const handleDeleteButton = (button: any) => {
    setActiveButtons((prev: any) => {
      return prev.filter((b: any) => b.key !== button.key);
    });
  };
  const availableButtons = buttons.filter(
    (b1) => !activeButtons.some((b2: any) => b1.key === b2.key)
  );
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await updateButton(page._id, formData);
      if (result) {
        toast.success("Data Saved");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <form action={handleSubmit} className="bg-blue-100 p-5 flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        {activeButtons.map((button: any) => (
          <div
            key={button.key}
            className="flex gap-4 items-center justify-center "
            draggable
          >
            <button.icon className="text-lg" />
            <label
              htmlFor={button.key}
              className="text-xl block w-36   font-semibold"
            >
              {button.label}:
            </label>
            <input
              type="text"
              name={button.key}
              id={button.key}
              defaultValue={page.buttons[button.key]}
              className="p-3 bg-gray-300 flex-1  block"
            />
            <button onClick={() => handleDeleteButton(button)}>
              <MdDelete className="text-xl" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5">
        {availableButtons?.map((button) => (
          <button
            onClick={() => handleAddButton(button)}
            key={button.key}
            className="flex items-center gap-3 bg-gray-300 p-2"
          >
            <button.icon className="text-lg" />
            <span className="font-semibold">{button.label}</span>
            <FaPlusCircle />
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <PendingButton
          type={"submit"}
          pendingText={"saving.."}
          defaultText={"Save"}
        />
      </div>
    </form>
  );
};

export default PageButtonsForm;
