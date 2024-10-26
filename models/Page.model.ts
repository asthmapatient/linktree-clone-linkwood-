import mongoose, { model, models, Schema } from "mongoose";

const pageSchema = new Schema(
  {
    uri: { type: String, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    displayname: { type: String, default: "" },
    address: { type: String, default: "" },
    bio: { type: String, default: "" },
    bgType: { type: String, default: "color" },
    bgColor: { type: String, default: "#9CA3AF" },
    bgImageUrl: { type: String, default: null },
    pfpImageUrl: { type: String, default: null },
    buttons: { type: Map, of: String, default: {} },
    links: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Page = models?.Page || model("Page", pageSchema);

export default Page;
