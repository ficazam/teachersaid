"use client";
import { getAllItems } from "@/lib/actions";
import { Item } from "@/lib/types/item.type";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { Card } from "../../components";
import { Listbox } from "@headlessui/react";
import SelectInput from "@/app/ui/components/SelectInput";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>("All Items");
  const [typeFilters, setTypeFilters] = useState<
    { label: string; value: string }[]
  >([]);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    if (!user.schoolId) return;

    getAllItems(user.schoolId).then((response) => {
      if (response) {
        setItems(
          response
            .sort((a, b) => a.type.localeCompare(b.type))
            .sort((a, b) => a.name.localeCompare(b.name))
        );

        const newFilters: { label: string; value: string }[] = [];

        response.map((item) => {
          const exists = Boolean(
            newFilters.find((filter) => filter.label === item.type)
          );

          if (exists) return;
          newFilters.push({ label: item.type, value: item.type });
        });

        setTypeFilters([
          { label: "All Items", value: "All Items" },
          ...newFilters,
        ]);
      }
    });
  }, [user.schoolId]);

  return (
    <div className="flex flex-col justify-center mt-5">
      <SelectInput item={filter} setItem={setFilter} options={typeFilters} />
      {items ? (
        items
          .filter((item: Item) =>
            filter === "All Items" ? true : filter === item.type
          )
          .map((item: Item) => (
            <Card key={item.id}>
              <p className="text-lg">TYPE: {item.type.toUpperCase()}</p>
              <p>Name: {item.name}</p>
              <p>stock: {item.inStock}</p>
            </Card>
          ))
      ) : (
        <p>No items to display yet.</p>
      )}
    </div>
  );
};

export default ItemList;
