"use server";
import { connectDb } from "@/lib/connectDb";
import Page from "@/models/Page.model";
import { revalidatePath } from "next/cache";

export async function getPage(id: string | undefined) {
  try {
    await connectDb();
    const page = await Page.findOne({ owner: id });
    return page;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function getPageByUri(uri: string | undefined) {
  try {
    await connectDb();
    const page = await Page.findOne({ uri });
    return page;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getPageStatus(id: string | undefined) {
  try {
    await connectDb();
    const page = await Page.findOne({ owner: id });
    if (page) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function updateData(id: string, formItem: FormData) {
  // console.log(formItem.get("bgImage"));

  const dataKeys = [
    "displayname",
    "address",
    "bio",
    "bgType",
    "bgColor",
    "bgImageUrl",
    "pfpImageUrl",
    "links",
  ];
  console.log("formdata", formItem.get("links"));
  const links = formItem.get("links");
  const formData: any = new Object();

  for (const key of dataKeys) {
    if (formItem.has(key)) {
      formData[key] = formItem.get(key);
    }
  }
  if (typeof links === "string") {
    const parsedLink = JSON.parse(links);
    formData.links = parsedLink;
  }
  console.log("object of formData", formData);
  var uri = "";
  try {
    await connectDb();
    const page = await Page.findByIdAndUpdate(id, formData);
    uri = page.uri;
    revalidatePath(`/${uri}`);
    revalidatePath("/account");
    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "some error occured");
  }
}

export async function updateButton(id: string, formItem: FormData) {
  const data: { [key: string]: string } = {};
  formItem.forEach((value, key) => {
    return (data[key] = value.toString());
  });
  try {
    await connectDb();
    const page = await Page.findByIdAndUpdate(id, { buttons: data });
    console.log("name", page.uri);
    revalidatePath("/account");
    revalidatePath(`/${page.uri}`);
    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "some error occured");
  }
}
