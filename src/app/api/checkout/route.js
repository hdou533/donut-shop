import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from '@/libs/authOptions';
import { Order } from "../../models/Order";
import { MenuItem } from '@/app/models/MenuItem';

const stripe = require('stripe')(process.env.STRIPE_SK)


export async function POST(req) {
    mongoose.connect(process.env.DATABASE_ACCESS)
    
    const { cartProducts, address } = await req.json()
    const session = await getServerSession(authOptions)
    const useremail = session?.user?.email

    const orderInfo = await Order.create({
        useremail,
        ...address,
        cartProducts,
        paid: false,
    })
    
    const stripeLineItems = []
    for (const cartProduct of cartProducts) {
        const productName = cartProduct.name
        const productInfo = await MenuItem.findById(cartProduct._id)
        let productsPrice = productInfo.price

        


        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'NZD',
                product_data: {
                    name: productName,
                }, 
                unit_amount: productsPrice * 100
            }
        })
    }

    

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: useremail,
        success_url: process.env.NEXTAUTH_URL + '/orders/' + orderInfo._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + '/cart?canceled=1',
        metadata: { orderId: orderInfo._id.toString()},
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery Fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 500, currency: 'NZD'}
                }
            }
        ]
    })

    
    return Response.json(stripeSession.url)
}
