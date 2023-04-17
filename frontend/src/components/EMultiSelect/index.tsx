import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import Select from "react-select";
import { IMultiSelect } from "../../models/product.model";

interface IProps {
  options: any;
  onChange: () => void;
  value: IMultiSelect[];
  wrapperClassName?: string;
  label?:string;
  name?: string;
  error?: boolean;
  helperText?: string;
}
const EMultiSelect: React.FC<IProps> = ({ options, onChange, value,wrapperClassName,label,name, error, helperText }) => {
  return (
    <div className={clsx("relative", wrapperClassName)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx("block text-sm font-medium text-gray-700", {
            "text-red-400": error,
          })}
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <Select
          isMulti
          name="colors"
          options={options}
          onChange={onChange}
          value={value}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      {error && (
        <div className="flex">
          <ExclamationCircleIcon className="w-4 h-4 text-red-400 m-1" />
          <p className="text-xs text-red-400 my-1 font-thin">{helperText}</p>
        </div>
      )}
    </div>
  );
};

export default EMultiSelect;
