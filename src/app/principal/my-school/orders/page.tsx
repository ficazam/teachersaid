"use client";
import { getOrders } from "@/lib/actions/getOrders";
import { Order } from "@/lib/types/order.type";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { getSingleSchool } from "@/lib/actions";
import { getUsers } from "@/lib/actions/getUsers";
import { UserRole } from "@/lib/enums/user-role.enum";
import { User } from "@/lib/types/user.type";
import OrderItemCard from "./components/OrderItemCard";

const Orders = () => {
  const { user } = useUserStore((state) => state);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [schoolName, setSchoolName] = useState<string>("");
  const [teachers, setTeachers] = useState<User[]>([]);

  useEffect(() => {
    getOrders(user.schoolId!).then(
      (response) =>
        response &&
        setAllOrders(
          response.sort((a, b) => (b.deliveryDate > a.deliveryDate ? -1 : 1))
        )
    );

    getSingleSchool(user.schoolId!).then(
      (response) => response && setSchoolName(response.name)
    );

    getUsers(user.schoolId!, UserRole.Teacher).then(
      (response) => response && setTeachers(response)
    );
  }, [user]);

  return (
    <>
      <h1 className="text-4xl text-center">{schoolName}</h1>
      <h1 className="text-4xl text-center">All Orders</h1>
      {allOrders.map((order, index) => (
        <OrderItemCard
          key={order.id}
          order={order}
          index={index}
          teacher={teachers.find(
            (teacher) => order.teacherId === teacher.id
          )}
        />
      ))}
    </>
  );
};

export default Orders;
