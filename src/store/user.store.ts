import { auth, database } from "@/firebase/firebase.config";
import { User, emptyUser } from "@/lib/types/user.type";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

interface IUserStore {
  user: User;
  checkAuthState: () => {};
}

const useUserStore = create<IUserStore>((set) => ({
  user: emptyUser,

  checkAuthState: async () => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docReference = doc(database, "Users", user.uid);
        const userSnapshot = await getDoc(docReference);
        const userInformation: User | undefined = userSnapshot.data() as User;

        set({ user: userInformation });
      } else {
        set({ user: emptyUser });
      }
    });
  },
}));

export default useUserStore;
