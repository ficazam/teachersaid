import { ChangeEvent, SetStateAction } from "react";

interface iInputProps {
  className?: string;
  labelClassName?: string;
  inputName: string;
  label: string;
  type?: string;
  inputClassName?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: iInputProps) => {
  const {
    className,
    labelClassName,
    inputName,
    label,
    inputClassName,
    type = "text",
    value,
    onChange,
  } = props;

  return (
    <div className={`mb-6 ${className}`}>
      <label
        className={`block text-gray-700 text-sm font-bold mb-2 ${labelClassName}`}
        htmlFor={inputName}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
        name={inputName}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
