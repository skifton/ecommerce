import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useGetCartList } from "../../services/cart.service";

const EPreviewCart: React.FC = () => {
  const context = useContext(AuthContext);
  const session_id = context?.user?.session_id;
  const { cartItems } = useGetCartList(session_id ? session_id : "");
  return (
    <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
      <Popover.Button className="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-white group-hover:text-gray-800">
          {cartItems?.length}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
          <h2 className="sr-only">Shopping Cart</h2>

          <form className="mx-auto max-w-2xl px-4">
            <ul className="divide-y divide-gray-200">
              {cartItems?.length !== 0 ? (
                cartItems?.map((cartItem: any) => (
                  <li key={cartItem?.id}>
                    <Link
                      className="flex items-center py-6 justify-between"
                      to={`category/${cartItem?.product_id}`}
                    >
                      <div className="flex">
                        <img
                          src={cartItem?.image}
                          alt={cartItem?.name}
                          className="h-16 w-16 flex-none rounded-md border border-gray-200"
                        />
                        <div className="ml-4 flex-auto">
                          <h3 className="font-medium text-gray-900">
                            {cartItem?.name}
                          </h3>
                          <p className="text-gray-500">{cartItem?.color}</p>
                          <p className="text-gray-500">{cartItem?.size}</p>
                        </div>
                      </div>
                      <p className="text-gray-500">x<span className="text-xl">{cartItem.quantity}</span></p>
                    </Link>
                  </li>
                ))
              ) : (
                <p className="my-5 text-gray-600 text-center">
                  Your cart is empty.
                </p>
              )}
            </ul>
            {cartItems?.length !== 0 ? (
              <Link
                to={`/checkout/${cartItems ? cartItems[0]?.session_id : 1}`}
                className="w-full flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                <span className="w-full text-center">Checkout</span>
              </Link>
            ) : (
              <div className="w-full flex rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:cursor-not-allowed">
                <span className="w-full text-center">Checkout</span>
              </div>
            )}

            <p className="mt-6 text-center">
              <Link
                to="/cart"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Shopping Bag
              </Link>
            </p>
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default EPreviewCart;
