import mongoose from "mongoose";

const mongoDbConnection = process.env.MONGODB_CONNECTOIN;

if (!mongoDbConnection) {
  // console.log(mongoDbConnection);
  throw new Error(
    "please provide a valid connection string " + mongoDbConnection
  );
}

export async function connectDB() {
  if (mongoose.connection?.readyState >= 1) {
    // console.log("----- Already connected to mongoDB -----")
    return;
  }

  try {
  } catch (err) {
    console.log("Error while connection to MongoDB" + err);
  }
}
