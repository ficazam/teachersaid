"use client";
import { logout } from "@/lib/actions";
import useUserStore from "@/store/user.store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoArrowBack, IoLogOutOutline } from "react-icons/io5";


const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname.split("/").length > 2;
  const { user, clearUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      logout()
        .then(() => clearUser())
        .then(() => router.push("/"));
    }
  }, [user, clearUser, router]);

  const handleLogout = async () => {
    try {
      await logout();
      clearUser();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex flex-row ${
        isHome ? "justify-between" : "justify-end"
      } shadow-lg items-center px-5 fixed top-0 w-screen h-20 border bg-gradient-to-br from-blue-400/85 to-blue-600/85 ring-1 ring-white/5`}
    >
      {isHome && (
        <IoArrowBack
          onClick={() => router.back()}
          className="text-white h-7 w-7"
        />
      )}
      <IoLogOutOutline className="text-white h-7 w-7" onClick={handleLogout} />
    </div>
  );
};

export default Navigation;
