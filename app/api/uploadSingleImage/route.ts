import { uploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const image = data.get("sendIcon");

    const result = await uploadImage(image as File);

    console.log("uploadedImages", result);

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
