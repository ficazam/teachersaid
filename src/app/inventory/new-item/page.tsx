"use client";

import Input from "@/app/ui/components/Input";
import { Item, emptyItem } from "@/lib/types/item.type";
import { FormEvent, useState } from "react";
import { Button } from "../components";
import useUserStore from "@/store/user.store";
import { createNewItem } from "@/lib/actions/createNewItem";
import { useRouter } from "next/navigation";

const NewItem = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Item>(emptyItem);
  const { user } = useUserStore((state) => state);
  const router = useRouter();

  const handleNewItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!user || !user.schoolId) {
      return;
    }

    try {
      const itemToSend: Item = { ...newItem, schoolId: user.schoolId };
      await createNewItem(itemToSend);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl">Add Item To Inventory</h1>
      <form onSubmit={handleNewItem} className="px-5 mt-10">
        <Input
          inputName="itemName"
          value={newItem.name}
          label="Item Name"
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <Input
          inputName="itemType"
          value={newItem.type}
          label="New Item Type"
          onChange={(e) =>
            setNewItem({
              ...newItem,
              type: e.target.value,
            })
          }
        />
        <Input
          inputName="itemStock"
          value={newItem.inStock}
          type="number"
          label="How Many in Stock?"
          onChange={(e) =>
            setNewItem({
              ...newItem,
              inStock: parseInt(e.target.value),
            })
          }
        />
        <Button
          type="submit"
          isLoading={isLoading}
          buttonLabel="Add New Item"
        />
      </form>
    </>
  );
};

export default NewItem;
