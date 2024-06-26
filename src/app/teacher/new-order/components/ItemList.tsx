"use client";
import { getAllItems } from "@/lib/actions";
import { Item, emptyItem } from "@/lib/types/item.type";
import useUserStore from "@/store/user.store";
import { Suspense, useEffect, useState } from "react";
import { Button } from "../../components";
import Loader from "@/app/ui/components/Loader";
import { createNewOrder } from "@/lib/actions/createNewOrder";
import { Order } from "@/lib/types/order.type";
import { v4 } from "uuid";
import { OrderStatus } from "@/lib/enums/order-status.enum";
import { useRouter } from "next/navigation";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SelectInput from "@/app/ui/components/SelectInput";
import NewOrderItemCard from "../../components/NewOrderItemCard";

const ItemList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [date, setDate] = useState<Date | null | [Date | null, Date | null]>(
    new Date()
  );
  const [itemsToOrder, setItemsToOrder] = useState<
    { id: string; amount: number }[]
  >([]);
  const [filter, setFilter] = useState<string>("All Items");
  const [typeFilters, setTypeFilters] = useState<
    { label: string; value: string }[]
  >([]);
  const { user } = useUserStore((state) => state);
  const router = useRouter();

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

  const handleAddItemToOrder = (itemId: string) => {
    const itemInOrderIndex = itemsToOrder.findIndex(
      (item) => item.id === itemId
    );

    if (
      itemInOrderIndex >= 0 &&
      items.find((item) => item.id === itemId)?.inStock ===
        itemsToOrder[itemInOrderIndex].amount
    ) {
      return;
    }

    if (itemInOrderIndex >= 0) {
      let itemInOrder = itemsToOrder[itemInOrderIndex];
      itemInOrder!.amount += 1;

      const newItemsToOrder = itemsToOrder.map((item) =>
        item.id === itemId ? itemInOrder : item
      );
      return setItemsToOrder(newItemsToOrder);
    }

    return setItemsToOrder([...itemsToOrder, { id: itemId, amount: 1 }]);
  };

  const handleRemoveItemFromOrder = (itemId: string) => {
    const itemInOrderIndex = itemsToOrder.findIndex(
      (item) => item.id === itemId
    );

    if (itemInOrderIndex < 0) {
      return;
    }

    if (itemsToOrder[itemInOrderIndex].amount > 1) {
      let itemInOrder = itemsToOrder[itemInOrderIndex];
      itemInOrder!.amount -= 1;

      const newItemsToOrder = itemsToOrder.map((item) =>
        item.id === itemId ? itemInOrder : item
      );
      return setItemsToOrder(newItemsToOrder);
    }

    const newItemsToOrder = itemsToOrder.filter((item) => item.id !== itemId);
    return setItemsToOrder(newItemsToOrder);
  };

  const handleOrder = async () => {
    setIsLoading(true);
    const orderItems: Item[] = items.map((item) => {
      const itemInOrder = itemsToOrder.find(
        (itemToOrder) => itemToOrder.id === item.id
      );

      if (itemInOrder) {
        return { ...item, ordered: itemInOrder.amount };
      }

      return emptyItem;
    });

    const orderItemsFiltered = orderItems.filter((item) => item.id);
    if (orderItemsFiltered.length === 0 || !date || date === null) {
      setIsLoading(false);
      return;
    }

    const newOrder: Order = {
      id: v4(),
      creationDate: new Date(),
      deliveryDate: date as Date,
      status: OrderStatus.Ordered,
      schoolId: user.schoolId!,
      teacherId: user.id,
      requiresApproval: false,
      items: orderItemsFiltered,
    };

    try {
      await createNewOrder(newOrder);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center my-20">
      <Suspense fallback={<Loader />}>
        <Button
          buttonLabel="Order Items"
          buttonClassName="my-2"
          onClickHandler={handleOrder}
          isLoading={isLoading}
        />
        <p className="mb-1">Deliver by: </p>
        <DatePicker value={date} onChange={setDate} className="mb-2" />
        <SelectInput item={filter} setItem={setFilter} options={typeFilters} />
        {items ? (
          items
            .filter((item: Item) =>
              filter === "All Items" ? true : filter === item.type
            )
            .map((item: Item) => (
              <NewOrderItemCard
                key={item.id}
                item={item}
                amount={
                  itemsToOrder.find((orderedItem) => orderedItem.id === item.id)
                    ? itemsToOrder.find(
                        (orderedItem) => orderedItem.id === item.id
                      )!.amount
                    : ""
                }
                onClickAdd={handleAddItemToOrder}
                onClickRemove={handleRemoveItemFromOrder}
              />
            ))
        ) : (
          <p>No items to display yet.</p>
        )}
      </Suspense>
    </div>
  );
};

export default ItemList;
