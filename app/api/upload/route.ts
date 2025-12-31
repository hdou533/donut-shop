import uniqid from "uniqid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop();
    const newFileName = uniqid() + "." + ext;

    // S3 client
    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY!,
        secretAccessKey: process.env.AWS_SECRETKEY!,
      },
    });

    const bucket = "hdou533-donuts-shop";

    s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );

    const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
    return Response.json(link);
  }
  return Response.json(true);
}
