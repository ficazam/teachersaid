"use client";
import useUserStore from "@/store/user.store";

export default function Home() {
  const { user } = useUserStore((state) => state);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(user)}
    </main>
  );
}
