import React from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  name?: string;
}

const EInput: React.FC<IProps> = ({
  wrapperClassName,
  label,
  error,
  helperText,
  name,
  ...props
}) => {
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
        <input
          type="text"
          id={name}
          name={name}
          className={clsx(
            "block w-full p-1 rounded-md border-[1px] shadow-sm appearance-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl",
            {
              "border-red-400": error,
            }
          )}
          {...props}
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

export default EInput;
