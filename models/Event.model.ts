import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    type: String,
    uri: String,
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
