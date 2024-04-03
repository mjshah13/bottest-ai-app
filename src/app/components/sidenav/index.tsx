"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { UserButton, useSession } from "@clerk/nextjs";
import { NavigationItem, ServiceItem } from "../../../utils/typesInterface";
import { useRouter, Link } from "next/navigation";
import {
  Home,
  BarChartBig,
  Building2,
  CircleHelp,
  X,
  Menu,
} from "lucide-react";

const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: <Home />,
    current: true,
    isDisabled: false,
  },
  {
    name: "Analytics",
    href: "/app/analytics",
    icon: <BarChartBig />,
    current: false,
    isDisabled: false,
  },
  {
    name: "Organization",
    href: "/app/organization",
    icon: <Building2 />,
    current: false,
    isDisabled: false,
  },
];

const services: ServiceItem[] = [
  {
    id: 1,
    name: "Help",
    href: "https://www.google.com",
    icon: <CircleHelp />,
    current: false,
    isDisabled: false,
  },
  {
    id: 2,
    name: "Documentation",
    href: "https://www.google.com",
    icon: <Building2 />,
    current: false,
    isDisabled: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidenav = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  const handleNavigationClick = (item: NavigationItem) => {
    setActive(item.href);
    router.push(item.href);
  };

  const { session } = useSession();

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X color="#b6b8b7" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you
                like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/Assets/Logo.svg"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item, i) => (
                            <button
                              key={i}
                              disabled={item?.isDisabled}
                              onClick={() => handleNavigationClick(item)}
                              className={classNames(
                                item?.href === active
                                  ? "text-secondary bg-primary font-normal"
                                  : item?.isDisabled
                                    ? "text-[#b6b8b7]  hover:bg-lightgray"
                                    : "text-black hover:text-black hover:bg-lightgray",
                                "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 w-full  font-poppin"
                              )}
                              type="button"
                            >
                              {item?.icon}
                              {/* <item.icon
                                disabled={item?.isDisabled}
                                isActive={item?.href === active}
                                className={classNames("h-6 w-6 shrink-0")}
                                aria-hidden="true"
                              /> */}
                              {item.name}
                            </button>
                          ))}
                        </ul>
                      </li>

                      <li>
                        <ul
                          role="list"
                          className="-mx-2 mt-2 space-y-1 font-poppin"
                        >
                          {services?.map((item, i) => (
                            <button
                              key={i}
                              disabled={item?.isDisabled}
                              onClick={() => handleNavigationClick(item)}
                              className={classNames(
                                item?.href === active
                                  ? "text-secondary bg-primary font-normal "
                                  : item?.isDisabled
                                    ? "text-[#b6b8b7]  hover:bg-lightgray"
                                    : "text-black hover:text-black hover:bg-lightgray",
                                " flex items-center gap-x-3 rounded-md p-2 text-sm w-full  font-poppin "
                              )}
                            >
                              {item?.icon}
                              {item.name}
                            </button>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog >
      </Transition.Root >
      {/* Static sidebar for desktop */}

      < div className="hidden h-full lg:z-50 lg:flex lg:w-64 lg:flex-col " >
        <div
          className="flex grow flex-col gap-y-5  bg-white px-4"
          style={{ boxShadow: "0px 0px 4px 0px rgba(33, 36, 39, 0.08)" }}
        >
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/Assets/Logo.svg"
              alt="Your Company"
            />
          </div>
          <nav className="h-full  ">
            <div className="flex flex-col h-full justify-between">
              <div className="">
                <ul role="list" className=" space-y-1">
                  {navigation.map((item, i) => (
                    <button
                      disabled={item?.isDisabled}
                      key={i}
                      onClick={() => handleNavigationClick(item)}
                      className={classNames(
                        item?.href === active
                          ? "text-secondary bg-primary font-normal"
                          : item?.isDisabled
                            ? "text-[#b6b8b7]  hover:bg-lightgray"
                            : "text-black hover:text-black hover:bg-lightgray",
                        "group  flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 w-full  font-poppin"
                      )}
                      type="button"
                    >
                      {item?.icon}
                      {/* <item.icon
                        disabled={item?.isDisabled}
                        isActive={item?.href === active}
                        className={classNames("h-6 w-6 shrink-0")}
                        aria-hidden="true"
                      /> */}
                      {item.name}
                    </button>
                  ))}
                </ul>
              </div>
              <div className="">
                <ul
                  role="list"
                  className=" py-4 space-y-1 border-b-2 border-[#f0f0f0]"
                >
                  {services.map((item, i) => (
                    <button
                      disabled={item?.isDisabled}
                      key={i}
                      onClick={() => handleNavigationClick(item)}
                      className={classNames(
                        item?.href === active
                          ? "text-secondary bg-primary font-normal"
                          : item?.isDisabled
                            ? "text-[#b6b8b7]  hover:bg-lightgray"
                            : "text-black hover:text-black hover:bg-lightgray",
                        "group items-center flex gap-x-3 rounded-md p-2 text-sm w-full  font-poppin"
                      )}
                    >
                      {item?.icon}
                      {/* <item.icon
                        disabled={item?.isDisabled}
                        isActive={item?.href === active}
                        className={classNames("h-6 w-6 shrink-0")}
                        aria-hidden="true"
                      /> */}
                      {item.name}
                    </button>
                  ))}
                </ul>

                <div className="my-4 flex items-center gap-4">
                  <UserButton afterSignOutUrl="/sign-in" />
                  <h3 className="font-normal text-black font-poppin">
                    {session?.user?.fullName
                      ? session?.user?.fullName
                      : session?.user?.username}
                  </h3>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div >

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu />
        </button>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div >
  );
};

export default Sidenav;
