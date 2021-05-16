import mongoose from "mongoose";

export default async function connectDB(): Promise<void> {
  if (mongoose.connections[0]?.readyState) {
    // Use current db connection
    return;
  }
  // Use new db connection
  await mongoose.connect(process.env["MONGO_URL"] || "", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  return;
}
