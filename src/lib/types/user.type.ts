import { UserRole } from "../enums/user-role.enum";
import { UserStatus } from "../enums/user-status.enum";
import { Order } from "./order.type";

export interface User {
  id: string;
  image?: string;
  name: string;
  surname: string;
  role: UserRole;
  status: UserStatus;
  orders: Order[];
}

export const emptyUser = {
  id: "",
  image: "",
  name: "",
  surname: "",
  role: UserRole.Teacher,
  status: UserStatus.Unverified,
  orders: [],
};
