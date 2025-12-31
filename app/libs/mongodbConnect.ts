import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGO_URI = process.env.DATABASE_ACCESS || "";

// if (!MONGO_URI) {
//   throw new Error("Please define the DATABASE_ACCESS environment variable");
// }

// let cached = (global as any).mongoose;
// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export async function connectToDB() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

const client = new MongoClient(MONGO_URI);

export const clientPromise = client.connect();
