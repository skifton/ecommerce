import React, { ChangeEvent } from "react";
import { ICategories } from "../../../models/categories.model";

interface IProps {
    label?: string,
    value: string,
    onChange: (value: ChangeEvent<HTMLSelectElement>) => void,
    options: ICategories[],
}
const ESelectInput: React.FC<IProps> = ({
    label,
    value,
    onChange,
    options
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        onChange={onChange}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-xl sm:leading-6"
        value={value}
      >
        {options.map((option) => {
            return <option key={option.name}>{option.name}</option>
        })}
      </select>
    </div>
  );
};

export default ESelectInput;
