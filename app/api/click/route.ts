import { connectDb } from "@/lib/connectDb";
import Event from "@/models/Event.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();
  const searchParams = req.nextUrl.searchParams;
  const query = atob(searchParams.get("url") as string);
  await Event.create({ type: "click", uri: query });
  return NextResponse.json(true);
}
