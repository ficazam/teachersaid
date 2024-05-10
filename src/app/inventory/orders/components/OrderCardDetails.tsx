"use client";
import { Order, emptyOrder } from "@/lib/types/order.type";
import { User, emptyUser } from "@/lib/types/user.type";
import React, { useEffect, useState } from "react";
import { Button, CancelButton, DangerButton } from "../../components";
import { OrderStatus } from "@/lib/enums/order-status.enum";
import { updateOrder } from "@/lib/actions/createNewOrder";
import Loader from "@/app/ui/components/Loader";
import useUserStore from "@/store/user.store";
import { getSingleOrder } from "@/lib/actions/getOrders";
import { getSingleUser } from "@/lib/actions/getUsers";

const OrderCardDetails = ({ orderId }: { orderId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleOrderUpdate = async (updateTo: OrderStatus) => {
    setIsLoading(true);

    try {
      const newOrder = { ...order, status: updateTo };
      await updateOrder(newOrder);
      setOrder(newOrder)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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

      {isLoading && <Loader />}

      {!isLoading && order.status === OrderStatus.Ordered && (
        <div className="flex gap-x-2">
          <Button
            buttonLabel="Accept"
            onClickHandler={() => handleOrderUpdate(OrderStatus.Accepted)}
          />
          <DangerButton
            buttonLabel="Reject"
            onClickHandler={() => handleOrderUpdate(OrderStatus.Denied)}
          />
        </div>
      )}

      {!isLoading && order.status === OrderStatus.Accepted && (
        <div className="flex gap-x-2">
          <CancelButton
            buttonLabel="To Delivery"
            onClickHandler={() => handleOrderUpdate(OrderStatus.Route)}
          />
        </div>
      )}

      {!isLoading && order.status === OrderStatus.Route && (
        <div className="flex gap-x-2">
          <Button
            buttonLabel="Deliver"
            onClickHandler={() => handleOrderUpdate(OrderStatus.Delivered)}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCardDetails;
