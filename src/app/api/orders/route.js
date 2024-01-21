import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '@/libs/authOptions';
import { UserInfo } from '@/app/models/UserInfo';
import { Order } from "../../models/Order";


export async function GET(){
    mongoose.connect(process.env.DATABASE_ACCESS)

    const session = await getServerSession(authOptions)

    const useremail = await session?.user?.email

    let isAdmin = false

    if (useremail) {
        const userInfo = await UserInfo.findOne({email:useremail})
        if (userInfo) {
            isAdmin = userInfo.isAdmin

        }
    }

    if (isAdmin) {
        return Response.json(await Order.find())
    }

    if (userEmail) {
        return Response.json(await Order.find({useremail}))
    }
}
