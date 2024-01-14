import mongoose from "mongoose"
import { User } from "@/app/models/User"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
import { UserInfo } from "@/app/models/UserInfo"



export const PUT = async (req) => {
    mongoose.connect(process.env.DATABASE_ACCESS)
    const data = await req.json()
    const { _id, name, image, ...otherUserInfo } = data


    let filter = {}
    if (_id) {
        filter = {_id}
        
    } else {
        const session = await getServerSession(authOptions)
        const email = session.user.email
        filter = {email}
 
       
    }

    const user = await User.findOne(filter)
    await User.updateOne(filter, { name, image })
    await UserInfo.findOneAndUpdate({email: user.email},otherUserInfo, {upsert: true})


    return Response.json(true)
}
 
export const GET = async (req) => {
    mongoose.connect(process.env.DATABASE_ACCESS)

    const url = new URL(req.url)
    const _id = url.searchParams.get("_id")

    let filter = {}
    if (_id) {

        filter = {_id}
       
        
    } else {

       
        const session = await getServerSession(authOptions)

        const email = session?.user?.email

        if (!email) {
            return Response.json({ 'message': 'email is null'})
        }
        filter = { email }

        
    }

    const user = await User.findOne(filter).lean()
    const userInfo = await UserInfo.findOne({email:user.email}).lean()
    
    return Response.json({...user, ...userInfo})
    
}
