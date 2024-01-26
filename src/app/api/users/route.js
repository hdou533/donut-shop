import { User } from "@/app/models/User";
import { isAdmin } from "@/libs/isAdmin";
import mongoose from "mongoose";


export async function GET() {
    mongoose.connect(process.env.DATABASE_ACCESS)

    const admin = await isAdmin()
    
    if (admin) {
        const users = await User.find()
        return Response.json(users)
    } else {
        return Response.json([])
    }
    

    
}
