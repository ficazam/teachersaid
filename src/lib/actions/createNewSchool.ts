'use server'
import { auth, database } from "@/firebase/firebase.config";
import { ISchoolInfo } from "../types/school.type";
import { User } from "../types/user.type";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { v4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";

export const createNewSchool = async (
    newUser: User,
    password: string,
    newSchool: ISchoolInfo
  ) => {
    try {
      const currentUser = auth.currentUser;
  
      const userRef = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        password
      );
  
      const school: ISchoolInfo = {
        ...newSchool,
        id: v4(),
        principalId: userRef.user.uid,
        employees: [...newSchool.employees, userRef.user.uid],
      };
      const principal: User = {...newUser, id: userRef.user.uid, schoolId: school.id}
  
  
      const docReference = doc(database, "Users", principal.id);
      const schoolReference = doc(database, "Schools", school.id);
  
      await setDoc(docReference, principal);
      await setDoc(schoolReference, school);
  
      auth.updateCurrentUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateSchool = async (schoolToUpdate: ISchoolInfo) => {
    try {
        const schoolReference = doc(database, 'Schools', schoolToUpdate.id)
        await setDoc(schoolReference, schoolToUpdate)
    } catch (error) {
        console.error(error)
    }
  }