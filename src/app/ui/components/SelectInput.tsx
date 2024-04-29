import { Listbox } from "@headlessui/react";

interface ISelectInputProps {
  item: string;
  setItem: React.Dispatch<
    React.SetStateAction<string>
  >;
  options: { label: string, value: string }[]
}

const SelectInput = (props: ISelectInputProps) => {
  const { item, setItem, options } = props;

  return (
    <Listbox
      as="div"
      value={item}
      onChange={setItem}
      className="grow border border-indigo-500 rounded"
    >
      <Listbox.Button
        as="button"
        className="w-full focus:outline-none py-1 px-2 text-base"
      >
        {item}
      </Listbox.Button>
      <Listbox.Options className="fixed z-10 w-[80vw] focus:outline-none rounded bg-white/75 backdrop-blur-sm ring-1 ring-white shadow-md">
        {options.map((option) => (
          <Listbox.Option
            as="div"
            key={option.label}
            value={option.value}
            className="text-lg py-1 px-2"
          >
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default SelectInput;
