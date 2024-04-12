"use client";
interface iButtonProps {
  isLoading?: boolean;
  onClickHandler?: (
    event: React.MouseEvent<HTMLButtonElement> &
      React.FormEvent<HTMLFormElement>
  ) => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  role: "submit" | "cancel" | "danger";
  buttonClassName?: string;
  buttonLabel: string;
}

const Button = (props: iButtonProps) => {
  const {
    isLoading,
    onClickHandler,
    disabled = false,
    type = "button",
    role,
    buttonClassName,
    buttonLabel,
  } = props;

  const buttonColours = [
    {
      role: "danger",
      colour: "bg-red-500 border-red-500",
      text: "text-white",
      hover: "hover:bg-red-700 hover:border-red-900",
    },
    {
      role: "submit",
      colour: "bg-blue-500 border-blue-500",
      text: "text-white",
      hover: "hover:bg-blue-700 hover:border-blue-900",
    },
    {
      role: "cancel",
      colour: "bg-white border-blue-200",
      text: "text-blue-500",
      hover: "hover:bg-blue-200 hover:border-blue-900",
    },
  ];

  const selectedButton = buttonColours.find((set) => set.role === role);

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border ${selectedButton?.colour} ${selectedButton?.text} ${selectedButton?.hover} ${buttonClassName}`}
      onClick={(
        event: React.MouseEvent<HTMLButtonElement> &
          React.FormEvent<HTMLFormElement>
      ) => onClickHandler?.(event)}
    >
      {isLoading ? "Loading..." : buttonLabel}
    </button>
  );
};

export default Button;
