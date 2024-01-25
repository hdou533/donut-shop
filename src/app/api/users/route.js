import { User } from "@/app/models/User";
import mongoose from "mongoose";
import { isAdmin } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    mongoose.connect(process.env.DATABASE_ACCESS)

    const admin = await isAdmin()
    console.log(admin)
    if (admin) {
        const users = await User.find()
        return Response.json(users)
    } else {
        return Response.json([])
    }
    

    
}
