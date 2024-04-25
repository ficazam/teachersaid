"use client";
import { Button } from "../components";
import Input from "@/app/ui/components/Input";
import { createNewSchool } from "@/lib/actions";
import { UserRole } from "@/lib/enums/user-role.enum";
import { ISchoolInfo, emptySchool } from "@/lib/types/school.type";
import { User, emptyUser } from "@/lib/types/user.type";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const NewSchool = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newSchool, setNewSchool] = useState<ISchoolInfo>(emptySchool);
  const [principal, setPrincipal] = useState<User>({
    ...emptyUser,
    role: UserRole.Principal,
  });
  const [principalPassword, setPrincipalPassword] = useState<{
    password: string;
    confirm: string;
  }>({ password: "", confirm: "" });
  const router = useRouter();

  const handleValidations = () => {
    if (principalPassword.password !== principalPassword.confirm) {
      console.log({ newSchool, principal, principalPassword });
      return false;
    }
    return true;
  };

  const handleCreateNewSchool = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!handleValidations()) {
      setIsLoading(false);
      return;
    }

    try {
      await createNewSchool(principal, principalPassword.password, newSchool);
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl">Create a new School</h1>

      <form onSubmit={handleCreateNewSchool} className="px-10">
        <Input
          inputName="schoolName"
          label="School Name"
          value={newSchool.name}
          onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
        />
        <div className="flex gap-x-2">
          <Input
            inputName="principalName"
            label="Principal's Name"
            value={principal.name}
            onChange={(e) =>
              setPrincipal({ ...principal, name: e.target.value })
            }
          />
          <Input
            inputName="principalSurname"
            label="Principal's Last Name"
            value={principal.surname}
            onChange={(e) =>
              setPrincipal({ ...principal, surname: e.target.value })
            }
          />
        </div>
        <Input
          inputName="principalEmail"
          label="Principal's Email"
          type="email"
          value={principal.email}
          onChange={(e) =>
            setPrincipal({ ...principal, email: e.target.value })
          }
        />
        <Input
          inputName="principalPassword"
          label="Principal's Password"
          type="password"
          value={principalPassword.password}
          onChange={(e) =>
            setPrincipalPassword({
              ...principalPassword,
              password: e.target.value,
            })
          }
        />
        <Input
          inputName="principalPasswordConfirmation"
          label="Confirm Principal's Password"
          type="password"
          value={principalPassword.confirm}
          onChange={(e) =>
            setPrincipalPassword({
              ...principalPassword,
              confirm: e.target.value,
            })
          }
        />

        <Button
          type="submit"
          buttonLabel="Submit New School"
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default NewSchool;
