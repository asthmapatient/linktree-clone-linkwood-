import React from "react";

const Input = ({ formData }: any) => {
  return (
    <>
      {formData.map((item: any) => {
        return (
          <div key={item.title} className="flex flex-col gap-3">
            <label
              htmlFor={item.title}
              className="capitalize text-l font-semibold"
            >
              {item.title}
            </label>
            <input
              className="p-3 bg-gray-300"
              type={item.type}
              id={item.title}
              name={item.title}
              defaultValue={item.defaultvalue}
              placeholder={item.placeholder}
            />
          </div>
        );
      })}
    </>
  );
};

export default Input;
