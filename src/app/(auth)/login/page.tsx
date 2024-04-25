"use client";
import { Button, CancelButton, DangerButton } from "../components";
import Input from "@/app/ui/components/Input";
import { login } from "@/lib/actions";
import useUserStore from "@/store/user.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const { setUser } = useUserStore((state) => state);
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/20 opacity-85 ring-1 ring-black/20 rounded px-8 pt-6 pb-8 mb-4 w-64">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          inputName="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          inputName="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Button type="submit" isLoading={isLoading} buttonLabel="Log In" />
      </form>
    </div>
  );
};

export default Login;
