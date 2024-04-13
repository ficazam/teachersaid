'use server'
import { auth, database } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { User } from "../types/user.type";

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
  
      return user as User
    } catch (error) {
      console.error(error);
      throw error;
    }
  };