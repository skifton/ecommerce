import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

interface IProps {
  addresses: any;
  address: any;
  onChangeAddress: (event: any) => void;
  onClickOpenAddAddressForm: () => void;
  isError: boolean;
  helperText?: string,
}
const Addresses: React.FC<IProps> = ({
  addresses,
  address,
  onChangeAddress,
  onClickOpenAddAddressForm,
  isError,
  helperText
}) => {
  return (
    <RadioGroup className="mt-10" value={address} onChange={onChangeAddress}>
      <RadioGroup.Label className="text-lg font-medium text-gray-900">
        Shipping Address<span className="text-red-500 font-thin">*</span>
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {addresses
          ? addresses?.map((addressMethod: any) => (
              <RadioGroup.Option
                key={addressMethod.id}
                value={addressMethod}
                className={({ checked, active }) =>
                  clsx(
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                    {
                      "border-transparent": checked,
                      "border-gray-300": !checked,
                      "ring-2 ring-indigo-500": active,
                    }
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {addressMethod.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {`${addressMethod.postalCode}, ${addressMethod.country}, ${addressMethod.city}, ${addressMethod.address}, ${addressMethod.apartment}`}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    {checked ? (
                      <CheckCircleIcon
                        className="h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className={clsx(
                        "pointer-events-none absolute -inset-px rounded-lg",
                        {
                          border: active,
                          "border-2": !active,
                          "border-indigo-500": checked,
                          "border-transparent": !checked,
                        }
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))
          : ""}
        <button
          onClick={onClickOpenAddAddressForm}
          type="button"
          className={clsx(
            "relative flex w-52 cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:bg-gray-200 focus:outline-none"
          )}
        >
          <span className="flex flex-1">
            <span className="flex flex-col">
              <RadioGroup.Label
                as="span"
                className="block text-sm font-medium text-gray-900"
              >
                Add new address
              </RadioGroup.Label>
              <RadioGroup.Description as="span">
                <PlusCircleIcon className="w-10 h-10 mt-5" />
              </RadioGroup.Description>
            </span>
          </span>
          <span
            className={clsx(
              "pointer-events-none absolute -inset-px rounded-lg"
            )}
            aria-hidden="true"
          />
        </button>
      </div>
      {isError && <p className="text-red-500">{helperText}</p>}
    </RadioGroup>
  );
};

export default Addresses;
