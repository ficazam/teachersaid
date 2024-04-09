import { OrderStatus } from "../enums/order-status.enum";
import { Item } from "./item.type";

export interface Order {
  id: string;
  createDate: Date;
  deliveryDate: Date;
  status: OrderStatus;
  requiresApproval: boolean;
  items: Item[];
}

export const emptyOrder = {
  id: "",
  createDate: new Date(),
  deliveryDate: new Date(),
  status: OrderStatus.Ordered,
  requiresApproval: false,
  items: [],
};
