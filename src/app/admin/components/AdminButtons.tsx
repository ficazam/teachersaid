"use client";
import Loader from "@/app/ui/components/Loader";

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

const Button = (props: iButtonProps) => {
  const {
    isLoading,
    onClickHandler,
    disabled = false,
    type = "button",
    buttonClassName,
    buttonLabel,
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-bold w-full min-h-10 flex justify-center items-center rounded focus:outline-none border ring-1 ring-black/5 bg-gradient-to-br from-blue-400/65 to-blue-600/65 border-white text-white ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? <Loader chosenColour="blue" /> : buttonLabel}
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

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-bold w-full min-h-10 flex justify-center items-center rounded focus:outline-none focus:shadow-outline border opacity-85 bg-gradient-to-br from-white/65 via-white/65 via-50% to-blue-300/65 border-blue-500 text-blue-500 ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? <Loader chosenColour="blue" /> : buttonLabel}
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
      className={`font-bold w-full min-h-10 flex justify-center items-center rounded focus:outline-none focus:shadow-outline border opacity-85 bg-gradient-to-br from-red-400/85 to-red-600/85 border-white text-white hover:bg-red-700 hover:border-red-900 ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? <Loader chosenColour="red" /> : buttonLabel}
    </button>
  );
};

export { Button, CancelButton, DangerButton };
