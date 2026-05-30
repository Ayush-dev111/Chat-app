import mongoose from "mongoose";

export const connectDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI is not defined");

   // Skip if already connected
  if (mongoose.connection.readyState >= 1) return;

  try {
    const cn = await mongoose.connect(mongoUri);
    console.log("Connected to the database:", cn.connection.host);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
