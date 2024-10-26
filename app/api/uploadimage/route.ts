import { uploadImage } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const dataNames = ["pfpImage", "bgImage", "sendIcon"];

    const uploadedImages: { [key: string]: string | null } = {};

    for (const key of dataNames) {
      if (data.has(key)) {
        const image = data.get(key) as unknown as File;
        const result = await uploadImage(image);
        uploadedImages[key] = result;
      }
    }

    console.log("uploadedImages", uploadedImages);

    return NextResponse.json({ result: uploadedImages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
