"use server";
import { doc, setDoc } from "firebase/firestore";
import { Order } from "../types/order.type";
import { database } from "@/firebase/firebase.config";

export const createNewOrder = async (itemsToOrder: Order) => {
  try {
    const orderReference = doc(
      database,
      "Schools",
      itemsToOrder.schoolId,
      "Orders",
      itemsToOrder.id
    );
    await setDoc(orderReference, itemsToOrder);
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async(order: Order) => {
  try {
    const orderReference = doc(
      database,
      "Schools",
      order.schoolId,
      "Orders",
      order.id
    );
    await setDoc(orderReference, order);
  } catch (error) {
    console.error(error);
  }
}
