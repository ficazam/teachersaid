"use client";
import { UserRole } from "@/lib/enums/user-role.enum";
import useUserStore from "@/store/user.store";

interface iButtonProps {
  isLoading?: boolean;
  onClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement> &
      React.FormEvent<HTMLFormElement>
  ) => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  buttonClassName?: string;
  buttonLabel: string;
}

const userColours = [
  { user: UserRole.Empty, value: "blue" },
  { user: UserRole.Admin, value: "blue" },
  { user: UserRole.Principal, value: "emerald" },
  { user: UserRole.Coordinator, value: "amber" },
  { user: UserRole.Teacher, value: "rose" },
  { user: UserRole.Inventory, value: "indigo" },
];

const Button = (props: iButtonProps) => {
  const {
    isLoading,
    onClickHandler,
    disabled = false,
    type = "button",
    buttonClassName,
    buttonLabel,
  } = props;

  const { user } = useUserStore((state) => state);
  const colour = userColours.find((colour) => colour.user === user.role)?.value;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline border bg-${colour}-500 border-${colour}-500 text-white hover:bg-${colour}-700 hover:border-${colour}-900 ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? "Loading..." : buttonLabel}
    </button>
  );
};

const CancelButton = (props: iButtonProps) => {
  const {
    isLoading,
    onClickHandler,
    disabled = false,
    type = "button",
    buttonClassName,
    buttonLabel,
  } = props;

  const { user } = useUserStore((state) => state);
  const colour = userColours.find((colour) => colour.user === user.role)?.value;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline border bg-white border-${colour}-500 text-${colour}-500 hover:bg-${colour}-200 hover:border-${colour}-900  ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? "Loading..." : buttonLabel}
    </button>
  );
};

const DangerButton = (props: iButtonProps) => {
  const {
    isLoading,
    onClickHandler,
    disabled = false,
    type = "button",
    buttonLabel,
    buttonClassName,
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline border bg-red-500 border-red-500 text-white hover:bg-red-700 hover:border-red-900 ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? "Loading..." : buttonLabel}
    </button>
  );
};

export { Button, CancelButton, DangerButton };
