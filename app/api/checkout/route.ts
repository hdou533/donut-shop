import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { Order } from "../../models/Order";
import { MenuItem } from "@/models/MenuItem";
import { NextRequest } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req: NextRequest) {
  const dbUri = process.env.DATABASE_ACCESS;
  if (!dbUri) throw new Error("DATABASE_ACCESS is not set");

  await mongoose.connect(dbUri);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderInfo = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productName = cartProduct.name;
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productsPrice = productInfo.price;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "NZD",
        product_data: {
          name: productName,
        },
        unit_amount: productsPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "/orders/" +
      orderInfo._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "/cart?canceled=1",
    metadata: { orderId: orderInfo._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderInfo._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery Fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "NZD" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
