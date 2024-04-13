import { User, emptyUser } from "@/lib/types/user.type";
import { create } from "zustand";

interface IUserStore {
  user: User;
  setUser: (userInformation: User) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: emptyUser,
  setUser: (userInformation) => {
    console.log(userInformation)
    set({ user: userInformation });
  },
}));

export default useUserStore;
