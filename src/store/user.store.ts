import { User, emptyUser } from "@/lib/types/user.type";
import { create } from "zustand";

interface IUserStore {
  user: User;
  setUser: (userInformation: User) => void;
  clearUser: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: emptyUser,
  setUser: (userInformation) => {
    set({ user: userInformation });
  },
  clearUser: () => {
    set({ user: emptyUser });
  },
}));

export default useUserStore;
