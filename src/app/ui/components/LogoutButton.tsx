"use client";
import { logout } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true)
    }
  };

  return <button type='button' className="bg-red-500" onClick={handleLogout}>{isLoading ? 'Loading...' : 'papitas'}</button>;
};

export default LogoutButton;
