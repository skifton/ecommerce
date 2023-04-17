import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ICartProduct } from "../../models/product.model";

interface IProps {
  product: any;
  onDeleteClick: (id: string, price: number, quantity: number) => void;
  onIncrementQuantity: (
    id: string,
    params: { quantity: number },
    price: number
  ) => void;
  onDecrementQuantity: (
    id: string,
    params: { quantity: number },
    price: number
  ) => void;
}
const CartItem: React.FC<IProps> = ({
  product,
  onDeleteClick,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  return (
    <div key={product.name} className="flex py-6 sm:py-10">
      <Link to={`/category/${product?.product_id}`}>
        <div className="flex-shrink-0">
          <img
            src={product?.image}
            alt={product?.name}
            className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
          />
        </div>
      </Link>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm">
                <Link
                  to={`/category/${product.product_id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              {product.size ? (
                <p className="mt-1 text-sm text-gray-500">{product.size}</p>
              ) : null}
            </div>

            <p className="text-right text-sm font-medium text-gray-900">
              ${product.price}
            </p>
          </div>

          <div className="absolute sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
            <div className="flex flex-row h-10 text-center rounded-lg relative bg-gray-200 mt-1">
              <button
                type="button"
                onClick={() =>
                  onDecrementQuantity(
                    product.id ? product.id : "",
                    {
                      quantity: product.quantity - 1,
                    },
                    product.price
                  )
                }
                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-l cursor-pointer outline-none"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="number"
                className="outline-none focus:outline-none w-12 text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                value={product?.quantity}
              ></input>
              <button
                type="button"
                onClick={() =>
                  onIncrementQuantity(
                    product.id ? product.id : "",
                    {
                      quantity: product.quantity + 1,
                    },
                    product.price
                  )
                }
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-r cursor-pointer"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              onDeleteClick(
                product.id ? product.id : "",
                product.price ? product.price : 0,
                product.quantity
              )
            }
            className="ml-4 float-right text-sm font-medium text-red-500 hover:text-red-800 sm:ml-0 sm:mt-3"
          >
            <TrashIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
