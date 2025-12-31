import { Category } from "@/models/Category";
import mongoose from "mongoose";

import { isAdmin } from "@/libs/isAdmin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

export async function PUT(req: NextRequest) {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);

  const { name, _id } = await req.json();

  if (await isAdmin()) {
    await Category.updateOne({ _id }, { name });
  }
  return Response.json(true);
}

export async function GET() {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);

  return Response.json(await Category.find());
}

export async function DELETE(req: NextRequest) {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }
  return Response.json(true);
}
