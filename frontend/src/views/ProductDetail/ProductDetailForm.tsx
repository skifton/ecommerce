import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { ICartProduct, IProduct } from "../../models/product.model";

interface IProps {
  product: IProduct;
  useFormInstance: UseFormReturn<ICartProduct>;
  onAddProductToCart: (product: ICartProduct) => void;
}
const ProductDetailForm: React.FC<IProps> = ({
  product,
  useFormInstance,
  onAddProductToCart,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormInstance;
  return (
    <form onSubmit={handleSubmit(onAddProductToCart)}>
      <div>
        <Controller
          name="color"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              value={value || product.color[0]}
              onChange={onChange}
              className="mt-2"
            >
              <RadioGroup.Label className="text-sm font-medium text-gray-900 flex">
                Choose a color
              </RadioGroup.Label>
              <div>
                <div className="flex items-center space-x-3 mt-2">
                  {product?.color.map((color) => {
                    return (
                      <RadioGroup.Option
                        key={color.value}
                        value={color.label}
                        className={({ active, checked }) => {
                          return clsx(
                            `relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`,
                            color.value,
                            {
                              [`ring ring-offset-1 ring-${color.label.toLocaleLowerCase()}`]:
                                active && checked,
                              "ring-2": !active && checked,
                            }
                          );
                        }}
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {" "}
                          {color.label}{" "}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={clsx(
                            color.value,
                            `h-8 w-8 rounded-full border-1 border-opacity-1 border-${color.label.toLocaleLowerCase()}-500`
                          )}
                        />
                      </RadioGroup.Option>
                    );
                  })}
                </div>
                {Boolean(errors.color?.message) ? (
                  <p className="text-sm font-medium text-red-500 my-3">
                    {errors.color?.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </RadioGroup>
          )}
        />
      </div>
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">Size</h2>
        </div>
        <Controller
          name="size"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              value={value || product.size[0]}
              onChange={onChange}
              className="mt-2"
            >
              <RadioGroup.Label className="sr-only">
                {" "}
                Choose a size{" "}
              </RadioGroup.Label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {product?.size.map((size) => (
                  <RadioGroup.Option
                    key={size.value}
                    value={size.label}
                    className={({ active, checked }) =>
                      clsx(
                        size.value
                          ? "cursor-pointer focus:outline-none"
                          : "cursor-not-allowed opacity-25",
                        active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                        checked
                          ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                          : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                        "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                      )
                    }
                    disabled={!size}
                  >
                    <RadioGroup.Label as="span">{size.label}</RadioGroup.Label>
                  </RadioGroup.Option>
                ))}
              </div>
              {Boolean(errors.size?.message) ? (
                  <p className="text-sm font-medium text-red-500 my-3">
                    {errors.size?.message}
                  </p>
                ) : (
                  ""
                )}
            </RadioGroup>
          )}
        />
      </div>
      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to cart
      </button>
    </form>
  );
};

export default ProductDetailForm;
