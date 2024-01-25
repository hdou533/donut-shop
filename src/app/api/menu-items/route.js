import { MenuItem } from "@/app/models/MenuItem";
import { isAdmin } from "@/libs/isAdmin";
import mongoose from "mongoose";


export async function POST(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)

    const data = await req.json();
    if (admin) {
        const menuItemDoc = await MenuItem.create(data);
        return Response.json(menuItemDoc);
    } else {
        return Response.json({})
    }
  
}

export async function PUT(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)
    
    const admin = await isAdmin()
    if (admin) {
        const {_id, ...data} = await req.json()
        await MenuItem.findByIdAndUpdate(_id, data)
    }
    return Response.json(true)
}

export async function GET() {
    mongoose.connect(process.env.DATABASE_ACCESS)
    
    return Response.json(await MenuItem.find())
    
    
}

export async function DELETE(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    const admin = await isAdmin()
    if (admin) {
        await MenuItem.deleteOne({ _id })
    }
    return Response.json(true)


}
