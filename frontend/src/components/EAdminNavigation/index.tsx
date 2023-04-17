import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", to: "/admin/dashboard" },
  { name: "Users", to: "/admin/users" },
  { name: "Categories", to: "/admin/categories" },
  { name: "Products", to: "/admin/products" },
  { name: "Orders", to: "/admin/orders" },
  { name: "Addresses", to: "/admin/addresses" },
  { name: "Carts", to: "/admin/carts" },
];

const EAdminNavigation: React.FC = () => {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <NavLink
                        to=".."
                        className={({ isActive }) =>
                          clsx("rounded-md px-3 py-2 text-sm font-medium", {
                            "bg-gray-900 text-white": isActive,
                            "text-gray-300 hover:bg-gray-700 hover:text-white":
                              !isActive,
                          })

                        }
                      >
                        Back to the shop
                      </NavLink>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            clsx("rounded-md px-3 py-2 text-sm font-medium", {
                              "bg-gray-900 text-white": isActive,
                              "text-gray-300 hover:bg-gray-700 hover:text-white":
                                !isActive,
                            })
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="border-b border-gray-700 md:hidden">
            <div className="space-y-1 px-2 py-3 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx("block rounded-md px-3 py-2 text-base font-medium", {
                      "bg-gray-900 text-white": isActive,
                      "text-gray-300 hover:bg-gray-700 hover:text-white":
                        !isActive,
                    })
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default EAdminNavigation;
