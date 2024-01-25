import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '@/libs/authOptions';

import { Order } from "@/app/models/Order";
import moment from "moment-timezone";
import { isAdmin } from "@/libs/isAdmin";




export async function GET(req){
    mongoose.connect(process.env.DATABASE_ACCESS)

    const session = await getServerSession(authOptions)
    

    const userEmail = await session?.user?.email

    // let isAdmin = false

    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    if (_id) {
        const singleOrder = await Order.findById(_id)
       
        return Response.json(await Order.findById(_id))
    }


    // if (userEmail) {
    //     const userInfo = await UserInfo.findOne({email:userEmail})
    //     if (userInfo) {
    //         isAdmin = userInfo.isAdmin

    //     }
    // }

    const admin = await isAdmin()
    

    if (admin) {
        const allOrders = await Order.find()
        const allOrdersLocalTime = allOrders.map(order => {
            const localDate = moment(order.createdAt).tz('Pacific/Auckland').format('YYYY-MM-DD HH:mm:ss')
            
            return {
                ...order._doc,
                createdAt:localDate,
            }
        })
        return Response.json(allOrdersLocalTime)
    }

    if (userEmail) {
        const userOrders = await Order.find({ userEmail })
        const userOrdersLocalTime = userOrders.map(order => {
            const localDate = moment(order.createdAt).tz('Pacific/Auckland').format('YYYY-MM-DD HH:mm:ss')
           
            return {
                ...order._doc,
                createdAt:localDate,
            }
        })
        return Response.json(userOrdersLocalTime)
    }
}
