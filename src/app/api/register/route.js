import mongoose from "mongoose"
import { User } from '../../models/User';
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json()
    
    mongoose.connect(process.env.DATABASE_ACCESS)

    const pw = body.password

    if (!pw?.length || pw.length < 5) {
        new Error('Password must be at least 5 characters')
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPw = bcrypt.hashSync(pw, salt)
    body.password = hashedPw
    const user = await User.create(body)

    return Response.json(user)
}
