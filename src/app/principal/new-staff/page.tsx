"use client";
import { UserRole } from "@/lib/enums/user-role.enum";
import RoleCard from "../components/RoleCard";
import { FormEvent, useState } from "react";
import Input from "@/app/ui/components/Input";
import { User, emptyUser } from "@/lib/types/user.type";
import useUserStore from "@/store/user.store";
import Button from "@/app/ui/components/Button";
import { UserStatus } from "@/lib/enums/user-status.enum";
import { createNewUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

const AddStaff = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStaffRole, setSelectedStaffRole] = useState<number>(1);
  const [newStaff, setNewStaff] = useState<User>(emptyUser);
  const [newStaffPassword, setNewStaffPassword] = useState<{
    password: string;
    confirm: string;
  }>({ password: "", confirm: "" });
  const { user } = useUserStore((state) => state);
  const router = useRouter()

  const staffRoles = [
    { id: 1, label: "Coordinator", value: UserRole.Coordinator },
    { id: 2, label: "Teacher", value: UserRole.Teacher },
    { id: 3, label: "Inventory", value: UserRole.Inventory },
  ];

  const handleValidations = () => {
    if (newStaffPassword.password !== newStaffPassword.confirm) {
      console.log({ newStaff, newStaffPassword });
      return false;
    }
    return true;
  };

  const handleNewStaffMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!handleValidations()) {
      setIsLoading(false);
      return;
    }

    try {
      const newUser: User = {
        ...newStaff,
        role: staffRoles[selectedStaffRole-1].value,
        schoolId: user.schoolId,
        status: UserStatus.Active
      };

      await createNewUser(newUser, newStaffPassword.password)
      router.push('/')
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl">Create a new School</h1>
      <form onSubmit={handleNewStaffMember} className="px-5">
        <div className="flex items-center justify-evenly mb-10">
          {staffRoles.map((role) => (
            <RoleCard
              key={role.id}
              information={role}
              onPress={() => setSelectedStaffRole(role.id)}
              isSelected={selectedStaffRole === role.id}
            />
          ))}
        </div>
        <div className="flex items-center justify-evenly gap-x-2">
          <Input
            inputName="staffName"
            value={newStaff.name}
            label="First Name"
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
          />
          <Input
            inputName="staffSurname"
            value={newStaff.surname}
            label="Last Name"
            onChange={(e) =>
              setNewStaff({ ...newStaff, surname: e.target.value })
            }
          />
        </div>
        <Input
          inputName="staffEmail"
          value={newStaff.email}
          label="New User's Email"
          onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
        />
        <Input
          inputName="staffPassword"
          value={newStaffPassword.password}
          label="New User's Password"
          type='password'
          onChange={(e) =>
            setNewStaffPassword({
              ...newStaffPassword,
              password: e.target.value,
            })
          }
        />
        <Input
          inputName="staffConfirm"
          value={newStaffPassword.confirm}
          label="Confirm New User's Password"
          type='password'
          onChange={(e) =>
            setNewStaffPassword({
              ...newStaffPassword,
              confirm: e.target.value,
            })
          }
        />
        <Button
          type="submit"
          isLoading={isLoading}
          role="submit"
          buttonLabel="Create New User"
          userColour="emerald"
        />
      </form>
    </>
  );
};

export default AddStaff;
