import { User, emptyUser } from "@/lib/types/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  user: User;
  setUser: (userInformation: User) => void;
  clearUser: () => void;
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: emptyUser,
      setUser: (userInformation: User) => {
        set({ user: userInformation });
      },
      clearUser: () => {
        set({ user: emptyUser });
      },
    }),
    { name: "user-storage" }
  )
);

export default useUserStore;
