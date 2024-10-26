"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import PendingButton from "../buttons/PendingButton";
import { FaDeleteLeft } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";
import { updateData } from "@/actions/getPage";
import toast from "react-hot-toast";
import image from "@/public/image.png";

const CustomButtonsForm = ({ page, session }: any) => {
  const [links, setLinks] = useState(page.links || []);
  console.log("links", links);

  const addLink = () => {
    setLinks((prev: any) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          description: "",
          icon: "",
          url: "",
        },
      ];
    });
  };

  const handleDeleteButton = (index: string) => {
    setLinks((prev: any) => {
      return prev.filter((link: any) => link.key !== index);
    });
  };

  const handleImageChange = (e: any, key: string) => {
    const image = e.target.files[0];
    const url = URL.createObjectURL(image);
    setLinks((prev: any) => {
      return prev.map((link: any) => {
        if (link.key === key) {
          return { ...link, icon: url };
        }
        return link;
      });
    });
  };

  const handleSave = async (formData: FormData) => {
    const updatedLinks = await Promise.all(
      links.map(async (link: any) => {
        const data: {
          title: FormDataEntryValue;
          url: FormDataEntryValue;
          description: FormDataEntryValue;
          icon?: string;
        } = {
          title: formData.get("title" + link.key) || "",
          url: formData.get("url" + link.key) || "",
          description: formData.get("description" + link.key) || "",
        };

        const icon = formData.get("icon" + link.key);

        if (icon instanceof File && icon.size !== 0) {
          formData.set("sendIcon", icon as File);

          // Assuming you will handle image upload and get the icon URL from the server
          const result = await axios.post(
            "http://localhost:3000/api/uploadimage",
            formData
          );
          data.icon = result.data.result.sendIcon || "";
          console.log("data", data);
        }
        return { ...link, ...data };
      })
    );
    console.log("updatedLInks", updatedLinks);
    // Update the links state only once after all operations complete
    setLinks(updatedLinks);
    console.log("links", updatedLinks);
    const serializedLinks = JSON.stringify(updatedLinks);
    formData.set("links", serializedLinks);

    console.log(formData.get("links"));
    const result = await updateData(page._id, formData);
    if (result) {
      toast.success("saved successfully");
    }
  };

  return (
    <form action={handleSave} className="bg-blue-100 p-5 flex flex-col gap-3">
      <div className="grid lg:grid-cols-2 gap-6">
        {links.map((link: any) => {
          return (
            <div key={link.key} className="grid grid-cols-9 gap-4">
              <div className=" col-span-2 flex items-center justify-center">
                <label
                  htmlFor={"icon" + link.key}
                  className="relative h-20 w-20"
                >
                  <Image src={link.icon || image} alt="alt" fill />
                  <input
                    onChange={(e) => handleImageChange(e, link.key)}
                    type="file"
                    name={"icon" + link.key}
                    id={"icon" + link.key}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="col-span-6 flex flex-col gap-3">
                <input
                  className="bg-gray-300 p-3"
                  type="text"
                  name={`title${link.key}`}
                  defaultValue={link.title}
                  placeholder="Your title"
                />
                <input
                  className="bg-gray-300 p-3"
                  type="text"
                  name={`url${link.key}`}
                  defaultValue={link.url}
                  placeholder="Your url"
                />
                <textarea
                  name={`description${link.key}`}
                  defaultValue={link.description}
                  className="resize-none bg-gray-300 p-3 h-32"
                  placeholder="Your Description"
                ></textarea>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteButton(link.key)}
                className="col-span-1 bg-red-500 grid"
              >
                <FaDeleteLeft className="place-self-center" />
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={addLink}
      >
        <div className="bg-blue-400 p-2 rounded-full">
          <FaPlus className="text-white text-xl" />
        </div>
        <span className="text-blue-500 font-semibold text-lg">Add new</span>
      </button>

      <div className="flex items-center justify-center">
        <PendingButton
          type={"submit"}
          pendingText={"saving.."}
          defaultText={"Save"}
        />
      </div>
    </form>
  );
};

export default CustomButtonsForm;
