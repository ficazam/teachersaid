"use client";
import { logout } from "@/lib/actions/actions";
import Button from "../../ui/components/Button";
import { useRouter, usePathname } from "next/navigation";

const AdminNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isPrincipalHome = pathname.split("/").length > 2;

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
        isPrincipalHome ? "justify-between" : "justify-end"
      } items-center  px-5 absolute top-0 w-screen h-20 bg-emerald-500`}
    >
      {isPrincipalHome && (
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

export default AdminNav;
