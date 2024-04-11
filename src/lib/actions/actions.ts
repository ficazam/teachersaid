"use server";
import { auth, database } from "@/firebase/firebase.config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";

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

    console.log(user);

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
