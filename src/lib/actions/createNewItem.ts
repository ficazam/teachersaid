'use server'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Item } from "../types/item.type";
import { database } from "@/firebase/firebase.config";
import { v4 } from "uuid";

export const createNewItem = async (item: Item) => {
  try {
    const schoolItemCollection: Item[] = [];
    const schoolItemCollectionSnapshot = await getDocs(
      collection(database, "Schools", item.schoolId, "Items")
    );

    schoolItemCollectionSnapshot.forEach(async (document) => {
      schoolItemCollection.push(document.data() as Item);
    });

    const receivedItem: Item | undefined = schoolItemCollection.find(
      (dbItem) => item.name === dbItem.name && item.type === dbItem.type
    );

    if (receivedItem) {
      const itemReference = doc(
        database,
        "Schools",
        item.schoolId,
        "Items",
        receivedItem.id
      );

      const itemToSend: Item = {
        ...receivedItem,
        inStock: receivedItem.inStock + item.inStock,
      };

      await setDoc(itemReference, itemToSend);
      return;
    } else {
      const newItem: Item = { ...item, id: v4() };

      const itemReference = doc(
        database,
        "Schools",
        newItem.schoolId,
        "Items",
        newItem.id
      );

      await setDoc(itemReference, newItem);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
