import { User } from "@/models/User";
import { isAdmin } from "@/libs/isAdmin";
import mongoose from "mongoose";

export async function GET() {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);

  const admin = await isAdmin();

  if (admin) {
    const users = await User.find();
    return Response.json(users);
  } else {
    return Response.json([]);
  }
}
