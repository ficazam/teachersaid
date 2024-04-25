"use client";
import { getAllItems } from "@/lib/actions";
import { Item } from "@/lib/types/item.type";
import useUserStore from "@/store/user.store";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Card } from "../../components";
import { Listbox } from "@headlessui/react";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>("Select an Item Type");
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
      <Listbox
        as="div"
        value={filter}
        onChange={setFilter}
        className="w-[75vw] border border-indigo-500 rounded"
      >
        <Listbox.Button as="button" className='focus:outline-none py-1 px-2 text-base'>{filter}</Listbox.Button>
        <Listbox.Options className="fixed mt-2 z-50 w-[75vw] focus:outline-none rounded bg-white/50 backdrop-blur-sm ring-1 ring-black shadow-md">
          {typeFilters.map((typeFilter) => (
            <Listbox.Option
              as="div"
              key={typeFilter.label}
              value={typeFilter.value}
              className="text-lg py-1 px-2"
            >
              {typeFilter.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
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
        <p>No schools to display yet.</p>
      )}
    </div>
  );
};

export default ItemList;
