"use client";
import { Order } from "@/lib/types/order.type";
import React, { useState } from "react";
import OrderCardDetails from "./OrderCardDetails";
import { OrderStatus } from "@/lib/enums/order-status.enum";

const OrderItemCard = ({ order }: { order: Order }) => {
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);

  const openCard = (event: React.MouseEvent<HTMLButtonElement>) =>
    setIsCardOpen((prev) => !prev);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center w-[95vw] h-12 px-5 m-2 ring-1 ring-white/5 bg-gradient-to-br shadow-md from-rose-100/65 to-rose-300/65 rounded">
        <div className="absolute top-0 w-full h-full backdrop-blur-sm" />
        <button
          onClick={openCard}
          className="text-center z-0 w-full flex justify-between"
        >
          {order.status !== OrderStatus.Delivered &&
              order.status !== OrderStatus.Denied && (
                <>
                  <p>TO BE DELIVERED BY: </p>
                  <p>{order.deliveryDate.toDateString()}</p>
                </>
              )}

            {order.status === OrderStatus.Delivered && (
              <>
                <p>TO BE DELIVERED BY: </p>
                <p className="text-green-700 font-bold">
                  DELIVERED
                </p>
              </>
            )}

            {order.status === OrderStatus.Denied && (
              <>
                <p>TO BE DELIVERED BY: </p>
                <p className="text-red-700 font-bold">DENIED</p>
              </>
            )}
        </button>
      </div>

      {isCardOpen && <OrderCardDetails order={order} />}
    </div>
  );
};

export default OrderItemCard;
