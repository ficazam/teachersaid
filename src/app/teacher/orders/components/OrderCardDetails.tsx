import { Order } from "@/lib/types/order.type";
import React from "react";

const OrderCardDetails = ({ order }: { order: Order }) => {
  return (
    <div className="relative flex justify-center items-center w-[90vw] p-5 m-2 ring-1 ring-white/5 bg-gradient-to-br shadow-md from-rose-50/65 to-rose-200/65 rounded">
      <div className="absolute top-0 w-full h-full backdrop-blur-sm" />
      <div className="flex flex-col z-0 text-center w-full gap-y-3">
        <p>ORDER DETAILS</p>
        <div className="flex justify-between">
          <p>ORDER CREATED: </p>
          <p>{order.creationDate.toDateString()}</p>
        </div>

        <div className="flex justify-between">
          <p>TO BE DELIVERED BY: </p>
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
    </div>
  );
};

export default OrderCardDetails;
