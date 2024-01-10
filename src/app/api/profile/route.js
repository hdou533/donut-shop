import mongoose from "mongoose"
import { User } from "@/app/models/User"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import { UserInfo } from "@/app/models/UserInfo"



export const PUT = async (req) => {
    mongoose.connect(process.env.DATABASE_ACCESS)
    const data = await req.json()
    const {name, image, ...otherUserInfo} = data
    const session = await getServerSession(authOptions)
    const email = session.user.email
    
 
    await User.updateOne({ email }, { name, image })
    await UserInfo.findOneAndUpdate({email},otherUserInfo, {upsert: true})


    return Response.json(true)
}
 
export const GET = async () => {
    mongoose.connect(process.env.DATABASE_ACCESS)
    const session = await getServerSession(authOptions)

    const email = session?.user?.email

    if (!email) {
        return Response.json({ 'message': 'email is null'})
    }

    const user = await User.findOne({ email }).lean()
    const userInfo = await UserInfo.findOne({ email }).lean()
    
    return Response.json({...user, ...userInfo})
}
