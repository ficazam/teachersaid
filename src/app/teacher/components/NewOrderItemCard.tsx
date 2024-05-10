import { Item } from "@/lib/types/item.type";
import { IoAdd, IoRemove } from "react-icons/io5";
import Card from "./Card";

interface INewOrderItemCardProps {
  item: Item;
  amount: string | number
  onClickAdd: (id: string) => void;
  onClickRemove: (id: string) => void
}

const NewOrderItemCard = (props: INewOrderItemCardProps) => {
  const { item, amount, onClickAdd, onClickRemove } = props;

  return (
    <div className="flex">
      <div className="bg-gradient-to-br p-2 from-rose-300/65 to-rose-500/65 flex flex-col justify-between items-center w-10 my-2 rounded">
        <IoAdd
          className="text-white h-5 w-5"
          onClick={() => onClickAdd(item.id)}
        />
        <p className="text-white text-base">
          {amount}
        </p>
        <IoRemove
          className="text-white h-5 w-5"
          onClick={() => onClickRemove(item.id)}
        />
      </div>
      <Card>
        <p className="text-lg">TYPE: {item.type.toUpperCase()}</p>
        <p>Name: {item.name}</p>
        <p>stock: {item.inStock}</p>
      </Card>
    </div>
  );
};

export default NewOrderItemCard;
