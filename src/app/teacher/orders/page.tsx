"use client";
import { getTeacherOrders } from "@/lib/actions/getOrders";
import { Order } from "@/lib/types/order.type";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import OrderItemCard from "./components/OrderItemCard";

const Orders = () => {
  const { user } = useUserStore((state) => state);
  const [teachersOrders, setTeachersOrders] = useState<Order[]>([]);

  useEffect(() => {
    getTeacherOrders(user.schoolId!, user.id).then(
      (response) =>
        response &&
        setTeachersOrders(
          response.sort((a, b) => b.deliveryDate > a.deliveryDate ? -1 : 1)
        )
    );
  }, [user]);

  return (
    <>
      <h1 className="text-4xl text-center">My Orders</h1>
      {teachersOrders.map((order) => (
        <OrderItemCard key={order.id} order={order} />
      ))}
    </>
  );
};

export default Orders;
