import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { IDeliveryMethods } from "../../models/checkout-data.model";

interface IProps {
  deliveryMethods: IDeliveryMethods[];
  selectedDeliveryMethod: IDeliveryMethods;
  onChangeDeliveryMethod: (event: IDeliveryMethods) => void;
  isError: boolean;
  helperText?: string;
}
const DeliveryMethods: React.FC<IProps> = ({
  deliveryMethods,
  selectedDeliveryMethod,
  onChangeDeliveryMethod,
  isError,
  helperText,
}) => {
  return (
    <RadioGroup
      value={selectedDeliveryMethod}
      onChange={onChangeDeliveryMethod}
    >
      <RadioGroup.Label className="text-lg font-medium text-gray-900">
        Delivery method<span className="text-red-500 font-thin">*</span>
      </RadioGroup.Label>

      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        {deliveryMethods.map((deliveryMethod) => (
          <RadioGroup.Option
            key={deliveryMethod.id}
            value={deliveryMethod}
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
                      {deliveryMethod.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {deliveryMethod.turnaround}
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className="mt-6 text-sm font-medium text-gray-900"
                    >
                      {deliveryMethod.price}
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
        ))}
        {isError && <p className="text-red-500 text-medium">{helperText}</p>}
      </div>
    </RadioGroup>
  );
};

export default DeliveryMethods;
