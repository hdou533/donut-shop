import mongoose from "mongoose";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);

  const pw = body.password;

  if (!pw?.length || pw.length < 5) {
    new Error("Password must be at least 5 characters");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPw = bcrypt.hashSync(pw, salt);
  body.password = hashedPw;
  const user = await User.create(body);

  return Response.json(user);
}
