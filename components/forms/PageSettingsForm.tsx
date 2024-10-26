"use client";
import { MdImageSearch } from "react-icons/md";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import Input from "../formItems/Input";
import PendingButton from "../buttons/PendingButton";
import { updateData } from "@/actions/getPage";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import ColorImageToggler from "../formItems/ColorImageToggler";

const PageSettingsForm = ({ page, session }: any) => {
  const [tab, setTab] = useState(page?.bgType || "color");
  const [selectedImage, setSelectedImage] = useState<any>({
    bgImage: null,
    pfpImage: null,
  });
  const [imageUrl, setImageUrl] = useState({
    bgImage: page?.bgImageUrl || null,
    pfpImage:
      page?.pfpImageUrl ||
      `https://avatar.iran.liara.run/username?username=${session?.user?.name}`,
  });

  const handleSubmit = async (formItem: any) => {
    try {
      if (selectedImage.bgImage || selectedImage.pfpImage) {
        const formData = new FormData();
        Object.keys(selectedImage).forEach((key) => {
          if (selectedImage[key]) {
            formData.set(key, selectedImage[key]);
          }
        });

        const result = await axios.post(
          "http://localhost:3000/api/uploadimage",
          formData
        );

        console.log("result", result.data.result);
        Object.keys(result.data.result).map((key: string) => {
          if (result.data.result[key]) {
            formItem.set(key + "Url", result.data.result[key]);
          }
        });
      }
      console.log("formData", formItem.get("pfpImageUrl"));
      console.log("formData", formItem.get("bgImageUrl"));
      const result = await updateData(page._id, formItem);
      if (result) {
        toast.success("Saved Data");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleImageChange = async (e: any) => {
    const image = e.target.files[0];
    const name = e.target.name;

    if (image) {
      setSelectedImage((prev: any) => ({
        ...prev,
        [name]: image,
      }));
      const url = URL.createObjectURL(image);
      setImageUrl((prev: any) => ({
        ...prev,
        [name]: url,
      }));
    }
  };

  const formData = [
    {
      type: "text",
      title: "displayname",
      placeholder: "eg: John Doe",
      defaultvalue: page?.displayname || "",
    },
    {
      type: "text",
      title: "address",
      placeholder: "eg: Hattiban",
      defaultvalue: page?.address || "",
    },
  ];
  return (
    <form action={handleSubmit} className="bg-blue-100 p-5 flex flex-col gap-3">
      <div
        className={`  h-64 flex flex-col gap-2 items-center justify-center `}
        style={
          tab === "color"
            ? {
                backgroundColor: `${page?.bgColor}`,
              }
            : {
                backgroundImage: `url(${imageUrl.bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
        }
      >
        <RadioTogglers
          defaultCheckedValue={tab}
          onChange={(value: string) => {
            setTab(value);
          }}
        />
        <ColorImageToggler
          tab={tab}
          handleImageChange={handleImageChange}
          bgColor={page?.bgColor}
        />
      </div>

      <label
        htmlFor="pfpImage"
        className="self-center w-36 contain relative h-36 rounded-full  -mt-14 block"
      >
        <Image
          src={imageUrl.pfpImage}
          alt="alt"
          fill
          className="rounded-full"
        />
        <MdImageSearch className="text-5xl absolute bg-black text-white -right-2 bottom-1" />
        <input
          type="file"
          name="pfpImage"
          onChange={handleImageChange}
          className="hidden"
          id="pfpImage"
        />
      </label>

      <Input formData={formData} />
      <div className="flex flex-col gap-3">
        <label htmlFor="bio" className="capitalize text-l font-semibold">
          BIO
        </label>
        <textarea
          className="p-3 bg-gray-300 resize-none w-full h-40"
          id="bio"
          name="bio"
          defaultValue={page?.bio}
          placeholder="my Bio"
        />
      </div>
      <div className="flex justify-center ">
        <PendingButton
          type={"submit"}
          pendingText={"saving"}
          defaultText={"save"}
        />
      </div>
    </form>
  );
};

export default PageSettingsForm;
