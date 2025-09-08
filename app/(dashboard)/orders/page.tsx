"use client";
import { useProfile } from "@/components/UseProfile";

import UserTab from "@/components/layout/UserTab";
import Link from "next/link";
import { useEffect, useState } from "react";
import { dateTimeReadable } from "@/libs/datetime";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Show } from "@/components/icons/Show";

const OrdersPage = () => {
  const { status } = useSession();
  const [orders, setOrders] = useState();
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { loading, data: profileData } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoadingOrders(true);
    fetch("/api/orders").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  };

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  if (status === "loading" || loadingOrders) {
    return "Loading orders...";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <div className="text-center">
        <UserTab isAdmin={profileData.admin} />
      </div>

      <div className="my-8 flex flex-col">
        {orders &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-5 items-center gap-8"
            >
              <div className="col-span-4">
                <div className="flex gap-8 items-center">
                  <div
                    className={
                      (order.paid ? "bg-green-500" : "bg-red-500") +
                      " w-16 font-semibold text-white text-xs rounded-lg p-1 flex items-center justify-center"
                    }
                  >
                    {order.paid ? "Paid" : "Unpaid"}
                  </div>
                  <span className="text-gray-700 text-xs">
                    {dateTimeReadable(order.createdAt)}
                  </span>
                </div>

                <div className="mt-2 text-sm">
                  <span className="italic">{order.userEmail}</span>

                  <div className="w-full overflow-wrap text-gray-700">
                    {order?.cartProducts?.map((p) => p.name).join(", ")}
                  </div>
                </div>
              </div>

              <Link
                href={`/orders/${order._id}`}
                className="col-span-1 border-none font-semibold p-2 flex justify-center"
              >
                <Show />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrdersPage;
