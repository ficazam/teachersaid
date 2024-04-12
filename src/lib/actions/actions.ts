"use server";
import { auth, database } from "@/firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { ISchoolInfo } from "../types/school.type";
import { User } from "../types/user.type";
import { v4 } from 'uuid'

export const login = async (email: string, password: string) => {
  try {
    const cookieStore = cookies();
    const expires = 60 * 60 * 24 * 5 * 1000;

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docReference = doc(database, "Users", userCredentials.user.uid);
    const userReference = await getDoc(docReference);
    const user = userReference.data();

    if (!user) {
      throw new Error();
    }

    cookieStore.set("_role", user.role, {
      expires,
      secure: true,
      maxAge: expires,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const roleCookie = cookies().get("_role");
    const roleValue = roleCookie?.value;

    if (!roleCookie || !roleValue) {
      console.error({
        name: "no session",
        message: "No user currently logged in",
      });

      throw new Error();
    }

    cookies().delete("_role");
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const createNewUser = async (newUser: User, password: string) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

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

    const principal: User = {...newUser, id: userRef.user.uid}
    const school: ISchoolInfo = {
      ...newSchool,
      id: v4(),
      principalId: userRef.user.uid,
      employees: [...newSchool.employees, userRef.user.uid],
    };

    const docReference = doc(database, "Users", principal.id);
    const schoolReference = doc(database, "Schools", school.id);

    await setDoc(docReference, principal);
    await setDoc(schoolReference, school);

    auth.updateCurrentUser(currentUser);
  } catch (error) {
    console.error(error);
  }
};

export const getSchools = async() => {
  try {
    const schoolData = await getDocs(collection(database, 'Schools'))
    const allSchools: ISchoolInfo[] = []
    
    schoolData.forEach(school => allSchools.push(school.data() as ISchoolInfo))

    return allSchools
  } catch (error) {
    console.error(error)
  }
}