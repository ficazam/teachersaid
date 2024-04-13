'use server'
import { auth, database } from "@/firebase/firebase.config";
import { User } from "../types/user.type";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getSingleSchool } from "./getSchools";
import { ISchoolInfo } from "../types/school.type";
import { updateSchool } from "./createNewSchool";

export const createNewUser = async (newUser: User, password: string) => {
    try {
      const currentUser = auth.currentUser;
      const userRef = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        password
      );
  
      const user: User = {...newUser, id: userRef.user.uid}
  
      const docReference = doc(database, "Users", user.id);

      const userSchool = await getSingleSchool(user.schoolId!)
      const newEmployeeData = [...userSchool!.employees, user.id]

      const newSchool: ISchoolInfo = {...userSchool!, employees: newEmployeeData}
  
      await updateSchool(newSchool)
      await setDoc(docReference, user);
  
      auth.updateCurrentUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };
  