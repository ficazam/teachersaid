"use client";
import { logout } from "@/lib/actions/actions";
import Button from "../../ui/components/Button";
import { useRouter, usePathname } from "next/navigation";

const Navigation = ({ userNav }: { userNav: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname.split("/").length > 2;

  const colours = [
    { userType: "admin", colour: "bg-blue-500" },
    { userType: "principal", colour: "bg-emerald-500" },
    { userType: "coordinator", colour: "bg-amber-500" },
    { userType: "teacher", colour: "bg-rose-500" },
    { userType: "inventory", colour: "bg-indigo-500" },
  ];

  const background = colours.find((set) => set.userType === userNav)?.colour;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`flex flex-row ${
        isHome ? "justify-between" : "justify-end"
      } items-center  px-5 absolute top-0 w-screen h-20 ${background}`}
    >
      {isHome && (
        <Button
          role="cancel"
          buttonLabel="back"
          onClickHandler={() => router.back()}
        />
      )}
      <Button
        role="cancel"
        buttonLabel="Log Out"
        onClickHandler={handleLogout}
      />
    </div>
  );
};

export default Navigation;