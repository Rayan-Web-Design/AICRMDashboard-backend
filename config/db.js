import mongoose from "mongoose";

export const conectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in enviroment variables");
  }

  mongoose.set("strictQuery", true);

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(
    `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`,
  );
  return conn;
};
