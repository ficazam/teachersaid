"use client";
import { Order, emptyOrder } from "@/lib/types/order.type";
import { User, emptyUser } from "@/lib/types/user.type";
import React, { useEffect, useState } from "react";
import Loader from "@/app/ui/components/Loader";
import useUserStore from "@/store/user.store";
import { getSingleOrder } from "@/lib/actions/getOrders";
import { getSingleUser } from "@/lib/actions/getUsers";

const OrderCardDetails = ({ orderId }: { orderId: string }) => {
  const { user } = useUserStore((state) => state);
  const [order, setOrder] = useState<Order>(emptyOrder);
  const [teacher, setTeacher] = useState<User>(emptyUser);

  useEffect(() => {
    getSingleOrder(user.schoolId!, orderId).then(
      (response) => response && setOrder(response)
    );
  }, [user, orderId]);

  useEffect(() => {
    if (!order.teacherId) {
      return;
    }

    getSingleUser(order.teacherId).then(
      (response) => response && setTeacher(response)
    );
  }, [order]);

  if (!teacher.id || !order.id) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col z-0 text-center w-full gap-y-3 px-4">
      <p>ORDER DETAILS</p>
      <div className="flex justify-between">
        <p>TEACHER: </p>
        <p>
          {teacher.role} {teacher.name} {teacher.surname}
        </p>
      </div>

      <div className="flex justify-between">
        <p>ORDER CREATED: </p>
        <p>{order.creationDate.toDateString()}</p>
      </div>

      <div className="flex justify-between">
        <p>DELIVER BY: </p>
        <p>{order.deliveryDate.toDateString()}</p>
      </div>

      <div className="flex justify-between">
        <p>ORDER STATUS: </p>
        <p>{order.status}</p>
      </div>

      <div className="flex justify-between">
        <p>ORDER REQUIRES APPROVAL: </p>
        <p>{order.requiresApproval ? "YES" : "NO"}</p>
      </div>

      <div className="flex justify-between">
        <p>ORDER ITEMS: </p>
        <div className="flex flex-col items-end">
          {order.items.map((item) => (
            <p key={item.id}>
              {item.ordered}x {item.name}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OrderCardDetails;
