"use client";
import { logout } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    console.log('asdf')
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
