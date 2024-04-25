import { database } from "@/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
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
