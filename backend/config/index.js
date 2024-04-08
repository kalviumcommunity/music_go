import mongoose from "mongoose";

export async function connectToDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    if (!connection) {
      return console.log("Could not connect to MongoDB");
    }
    return console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

