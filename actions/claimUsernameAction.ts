"use server";

import { auth } from "@/auth";
import { connectDb } from "@/lib/connectDb";
import Page from "@/models/Page.model";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

export async function claimUsername(
  prevState: { success: boolean; error: any },
  formData: FormData
) {
  const uri = formData.get("username")?.toString();
  try {
    if (!uri) {
      throw new Error("Username cannot be empty.");
    }
    await connectDb();

    const existingPage = await Page.findOne({ uri });

    if (existingPage) {
      throw new Error("Username is already taken.");
    }
    const session = await auth();

    await Page.create({
      uri,
      owner: session?.user?.id,
    });
    return {
      success: true,
      error: undefined,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message || "An error occurred.",
    };
  }
}
