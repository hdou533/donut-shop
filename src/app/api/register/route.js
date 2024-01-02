import mongoose from "mongoose"
import { User } from '../../models/User';

export async function POST(req) {
    const body = await req.json()
    console.log(body)
    mongoose.connect(process.env.DATABASE_ACCESS)

    const user = await User.create(body)

    return Response.json(user)
}
