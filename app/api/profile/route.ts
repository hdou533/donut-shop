import mongoose from "mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { UserInfo } from "@/models/UserInfo";
import { NextRequest, NextResponse } from "next/server";
import { User as UserType } from "@/types/user";

export const PUT = async (req: NextRequest) => {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    filter = { email: session.user.email };
  }

  const user = await User.findOne(filter);
  if (!user) {
    throw new Error("User not found");
  }

  await User.updateOne(filter, { name, image });

  await UserInfo.findOneAndUpdate(
    { email: user.email }, // safe, user is guaranteed to exist
    otherUserInfo,
    { upsert: true }
  );

  return Response.json(true);
};

export const GET = async (req: NextRequest) => {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;

    if (!email) {
      return Response.json({ message: "email is null" });
    }
    filter = { email };
  }

  const user = await User.findOne(filter).lean<UserType>();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json({ ...user, ...userInfo });
};
