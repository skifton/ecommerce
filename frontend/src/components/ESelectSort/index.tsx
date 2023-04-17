import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { sortOptions } from "../../utils/filters.util";

interface IProps {
  selected: any;
  onChangeSelected: (value: { id: string; name: string }) => void;
}
const ESelectSort: React.FC<IProps> = ({ selected, onChangeSelected }) => {
  return (
    <Listbox value={selected} onChange={onChangeSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-52 border-none cursor-default bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-200 sm:text-sm sm:leading-6">
              <span className="block truncate float-right">
                {selected?.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-900"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {sortOptions.map((option) => (
                  <Listbox.Option
                    key={option?.id}
                    className={({ selected, active }) =>
                      clsx(
                        "relative cursor-default select-none float-right py-2 pl-3 pr-9",
                        {
                          "bg-gray-200 text-gray-900": active,
                          "text-gray-900": !active,
                          "bg-gray-200": selected,
                        }
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx("block truncate", {
                            "font-semibold": selected,
                            "font-normal": !selected,
                          })}
                        >
                          {option?.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default ESelectSort;
