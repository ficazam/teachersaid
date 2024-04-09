import { auth, database } from "@/firebase/firebase.config";
import { User, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { User as UserInfo } from '../lib/types/user.type'
import { create } from "zustand";

interface IAuthStore {
    user: User | null,
    login: (email: string, password: string) => Promise<User>
    logout: () => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  user: null,

  login: async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      set({ user });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

export default useAuthStore;
