import React from "react";
import { FaImage } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";

const items = [
  { title: "color", image: <IoIosColorPalette /> },
  { title: "image", image: <FaImage /> },
];

const RadioTogglers = ({ defaultCheckedValue, onChange }: any) => {
  return (
    <div className="radio-togglers ">
      {items.map((item) => {
        return (
          <label key={item.title} htmlFor={item.title} className="flex  items-center">
            <input
              type="radio"
              onChange={(e) => onChange(e.target.value)}
              id={item.title}
              name="bgType"
              defaultChecked={defaultCheckedValue === item.title}
              value={item.title}
            />

            <div className=" text-xl">
              {item.image}
              <span className="text-sm capitalize">{item.title}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default RadioTogglers;
