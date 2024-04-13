'use server'
import { auth } from "@/firebase/firebase.config";
import { signOut } from "firebase/auth";
import { cookies } from "next/headers";

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
  