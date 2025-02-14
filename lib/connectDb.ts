import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("connected to db");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
