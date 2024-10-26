"use client";

import Link from "next/link";
import { buttons } from "../forms/PageButtonsForm";
const HandlersButtons = ({ page }: any) => {
  const pageButton = Object.keys(page?.buttons);

  const pageButtonData = buttons.filter((b1) => {
    return pageButton.includes(b1.key);
  });
  return (
    <div className="flex items-center gap-4 text-3xl text-black ">
      {pageButtonData.map((button) => {
        return (
          <Link
            ping={`${process.env.PUBLIC_URL}/api/click?url=${btoa(
              page?.buttons[button.key]
            )}`}
            href={
              page?.buttons[button.key].startsWith("http://") ||
              page?.buttons[button.key].startsWith("https://")
                ? page?.buttons[button.key]
                : `http://${page?.buttons[button.key]}`
            }
            target="_blank"
            className="bg-white rounded-full p-2"
            rel="noopener noreferrer"
          >
            <button.icon />
          </Link>
        );
      })}
    </div>
  );
};

export default HandlersButtons;
