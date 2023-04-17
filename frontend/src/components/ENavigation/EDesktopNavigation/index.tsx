import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import clsx from "clsx";
import { navigation } from "../../../constants/navigation";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import EPreviewCart from "../../EPreviewCart";
import { Link } from "react-router-dom";
import Logo from "../../../assets/logo-under-hop.png";

interface IProps {
  onOpenMobileMenu: () => void;
  onLogoutClick: () => void;
  onDashboardClick: () => void;
  isAuth: boolean;
  isAdmin: boolean;
  onClickLogo: () => void;
}

const EDesktopNavigation: React.FC<IProps> = ({
  onOpenMobileMenu,
  onLogoutClick,
  onDashboardClick,
  isAuth,
  isAdmin,
  onClickLogo,
}) => {
  return (
    <header className="relative z-10">
      <nav aria-label="Top">
        <div className="bg-gray-900 backdrop-blur-md backdrop-filter">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div className="flex h-16 items-center justify-between">
                <div className="hidden h-full lg:flex">
                  <Popover.Group className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      <div
                        className="text-gray-200 flex items-center mr-10 hover:cursor-pointer"
                        onClick={onClickLogo}
                      >
                        <img className="h-14 w-14" src={Logo} alt="logo" />
                      </div>
                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          {({ open }) => (
                            <>
                              <div className="relative flex">
                                <Popover.Button className="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                  {category.name}
                                  <span
                                    className={clsx(
                                      "absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out",
                                      {
                                        "bg-white": open,
                                      }
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                  <div
                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                    aria-hidden="true"
                                  />

                                  <div className="relative bg-white">
                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                      <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                        {category.featured.map((item) => (
                                          <div
                                            key={item.name}
                                            className="group relative"
                                          >
                                            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center h-64 w-72"
                                              />
                                            </div>
                                            <Link
                                              to={item.href}
                                              className="mt-4 block font-medium text-gray-900"
                                            >
                                              <span
                                                className="absolute inset-0 z-10"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </Link>
                                            <p
                                              aria-hidden="true"
                                              className="mt-1"
                                            >
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      ))}

                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-white"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </Popover.Group>
                </div>

                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 p-2 text-white"
                    onClick={onOpenMobileMenu}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <a href="/" className="ml-2 p-2 text-white">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {!isAuth ? (
                  <div className="flex flex-1 items-center justify-end">
                    <Link
                      to="/login"
                      className="hidden text-sm font-medium text-white lg:block"
                    >
                      Sign In
                    </Link>

                    <div className="flex items-center lg:ml-8">
                      <Link
                        to="/register"
                        className="hidden text-sm font-medium text-white lg:block"
                      >
                        Create an account
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-end">
                    {isAdmin && (
                      <button className="flex mr-10" onClick={onDashboardClick}>
                        <p className="hidden text-sm font-medium text-white lg:block">
                          Dashboard
                        </p>
                      </button>
                    )}
                    <button className="flex" onClick={onLogoutClick}>
                      <p className="hidden text-sm font-medium text-white self-center lg:block">
                        Logout
                      </p>
                      <ArrowRightOnRectangleIcon className="h-7 w-7 m-1 text-white" />
                    </button>
                    <EPreviewCart/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default EDesktopNavigation;
