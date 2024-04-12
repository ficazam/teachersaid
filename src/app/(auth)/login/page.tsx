"use client";
import Button from "@/app/ui/components/Button";
import Input from "@/app/ui/components/Input";
import { login } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-64">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <Input
          inputName="email"
          label="Email"
          type='email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          inputName="password"
          label="Password"
          type='password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Button
          type="submit"
          isLoading={isLoading}
          role="submit"
          buttonLabel="Log In"
        />
      </form>
    </div>
  );
};

export default Login;
