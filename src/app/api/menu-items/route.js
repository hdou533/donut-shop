import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)

    const data = await req.json()
    console.log(data)
    const createdMenuItem = await MenuItem.create(data)
    
    return Response.json(createdMenuItem)
}

export async function PUT(req) {
    
}

export async function GET() {
    mongoose.connect(process.env.DATABASE_ACCESS)

    return Response.json(
        await MenuItem.find()
    )
}
