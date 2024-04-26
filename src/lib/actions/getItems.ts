'use server'
import { database } from "@/firebase/firebase.config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Item } from "../types/item.type";

export const getAllItems = async (schoolId: string) => {
  try {
    const itemSnapshot = await getDocs(
      collection(database, "Schools", schoolId, "Items")
    );
    const items: Item[] = [];

    itemSnapshot.forEach((item) => items.push(item.data() as Item));

    return items;
  } catch (error) {
    console.error(error);
  }
};

export const getOneItem = async(schoolId: string, itemId: string) => {
  try {
    const itemSnapshot = await getDoc(doc(database, 'Schools', schoolId, 'Items', itemId))
    const itemDetails = itemSnapshot.data()

    return itemDetails as Item
  } catch (error) {
    console.error(error)
  }
}