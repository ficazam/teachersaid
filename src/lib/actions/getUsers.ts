import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { UserRole } from "../enums/user-role.enum";
import { database } from "@/firebase/firebase.config";
import { User } from "../types/user.type";

export const getUsers = async (schoolId: string, userType: UserRole) => {
  try {
    const users: User[] = [];
    const userReference = collection(database, "Users");
    const allUsersData = await getDocs(userReference);

    allUsersData.forEach((user) => {
      const userData = user.data();

      if (userData.schoolId === schoolId && userData.role === userType) {
        users.push(userData as User);
      }
    });

    return users
  } catch (error) {
    console.error(error);
  }
};

export const getSingleUser = async (userId: string) => {
  try {
    const userReference = doc(database, "Users", userId);
    const userData = await getDoc(userReference);

   return userData.data() as User
  } catch (error) {
    console.error(error);
  }
}
