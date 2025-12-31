"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Right } from "@/components/icons/Right";
import { CartContextType } from "@/types/context";
import { CartContext } from "@/components/AppContext";
import { useProfile } from "@/components/UseProfile";
import { UserProfile } from "@/types/user";
import { Order } from "@/types/order";
import SectionHeader from "@/components/layout/SectionHeader";
import CartProduct from "@/components/menu/CartProduct";
import AddressInputs from "@/components/layout/AddressInputs";

const OrderPage = () => {
  const cartContext = useContext(CartContext);
  const clearCart = cartContext?.clearCart;
  const [order, setOrder] = useState<Order | null>();
  const { data: profileData } = useProfile();
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart?.();
      }
    }

    if (id) {
      fetch(`/api/orders?_id=${id}`).then((res) => {
        res.json().then((data) => {
          const orderData = {
            ...data,
            email: data.userEmail,
          };
          setOrder(orderData);
        });
      });
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += product.price;
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <Link href={"/orders"} className="">
        <div className="text-primary italic flex gap-2 hover:underline hover:underline-offset-4">
          <Right />
          <span>Back to Orders</span>
        </div>
      </Link>
      <div className="text-center mt-4">
        <SectionHeader mainHeader="Your order" subHeader="" />
        <div className="my-8">
          <p>Thanks for your order</p>
          <p>We will message you when your order is on the way</p>
        </div>
      </div>

      {order && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 my-8">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product} key={product._id} />
            ))}
            <div className="text-right text-md ">
              Subtotal: <span className="font-semibold pl-2">{subtotal}</span>
            </div>
            <div className="text-right text-md">
              Delivery: <span className="font-semibold pl-2">${5}</span>
            </div>
            <div className="text-right text-md">
              Total: <span className="font-semibold pl-2">${subtotal + 5}</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs
              disabled={true}
              addressProps={{
                phone: order?.phone ?? "",
                streetAddress: order?.streetAddress ?? "",
                postalCode: order?.postalCode ?? "",
                city: order?.city ?? "",
                country: order?.country ?? "",
              }}
              email={profileData?.email ?? ""}
              setAddressProp={() => {}}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderPage;
