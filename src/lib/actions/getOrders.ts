"use server";

import { database } from "@/firebase/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Order } from "../types/order.type";

export const getOrders = async (schoolId: string) => {
  try {
    const allOrders: Order[] = [];

    const ordersRef = collection(database, "Schools", schoolId, "Orders");
    const ordersData = await getDocs(ordersRef);

    ordersData.forEach((orderItem) => {
      const orderItemData = orderItem.data();

      const modifiedOrderItem: Order = {
        ...orderItemData,
        creationDate: orderItemData.creationDate.toDate(),
        deliveryDate: orderItemData.deliveryDate.toDate(),
      } as Order;

      allOrders.push(modifiedOrderItem);
    });

    return allOrders;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherOrders = async (schoolId: string, teacherId: string) => {
  try {
    const allOrders = await getOrders(schoolId);

    if (!allOrders || !allOrders.length) {
      return;
    }

    const allTeachersOrders: Order[] = allOrders.filter(
      (orderItem) => orderItem.teacherId === teacherId
    );

    return allTeachersOrders;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleOrder = async (schoolId: string, orderId: string) => {
  try {
    const orderRef = doc(database, "Schools", schoolId, "Orders", orderId);
    const orderData = await getDoc(orderRef);

    const orderItemData = orderData.data();

    if (!orderItemData) {
      return;
    }

    const order: Order = {
      ...orderItemData,
      creationDate: orderItemData.creationDate.toDate(),
      deliveryDate: orderItemData.deliveryDate.toDate(),
    } as Order;

    return order;
  } catch (error) {
    console.error(error);
  }
};
