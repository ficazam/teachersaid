import { Order } from "@/lib/types/order.type";
import React from "react";
import Link from "next/link";
import { User } from "@/lib/types/user.type";
import { OrderStatus } from "@/lib/enums/order-status.enum";

const OrderItemCard = ({
  order,
  index,
  teacher,
}: {
  order: Order;
  index: number;
  teacher?: User;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center w-[95vw] h-24 px-5 m-2 ring-1 ring-white/5 bg-gradient-to-br shadow-md from-indigo-100/65 to-indigo-300/65 rounded">
        <Link
          href={`/inventory/orders/orderDetails/${order.id}`}
          className="text-center z-0 w-full flex flex-col gap-y-2"
        >
          <div className="flex justify-between">
            <p>ORDER</p>
            <p>{index + 1}</p>
          </div>
          <div className="flex justify-between">
            <p>DELIVER TO: </p>
            <p>
              {teacher?.name || ""} {teacher?.surname || ""}
            </p>
          </div>
          <div className="flex justify-between">
            {order.status !== OrderStatus.Delivered &&
              order.status !== OrderStatus.Denied && (
                <>
                  <p>DELIVER BY: </p>
                  <p>{order.deliveryDate.toDateString()}</p>
                </>
              )}

            {order.status === OrderStatus.Delivered && (
              <>
                <p>DELIVER BY: </p>
                <p className="text-green-700 font-bold">
                  DELIVERED
                </p>
              </>
            )}

            {order.status === OrderStatus.Denied && (
              <>
                <p>DELIVER BY: </p>
                <p className="text-red-700 font-bold">DENIED</p>
              </>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrderItemCard;
