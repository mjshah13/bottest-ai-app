"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton, useSession } from "@clerk/nextjs";
import { NavigationItem, ServiceItem } from "../../../utils/Interface";
import { useRouter } from "next/navigation";

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/app/dashboard", icon: HomeIcon, current: true },
  {
    name: "Analytics",
    href: "/app/analytics",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Organization",
    href: "/app/organization",
    icon: FolderIcon,
    current: false,
  },
];

const services: ServiceItem[] = [
  { id: 1, name: "Help", href: "#", icon: HomeIcon, current: false },
  { id: 2, name: "Documentation", href: "", icon: UsersIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidenav = ({ children }: { children: any }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState(pathname); // Initialize with the active item

  const handleNavigationClick = (item: NavigationItem) => {
    setActive(item.href);
    router.push(item.href);
  };

  const { session } = useSession();

  // console.log(session?.user?.fullName)

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
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
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
                              onClick={() => handleNavigationClick(item)}
                              className={classNames(
                                item?.href === active
                                  ? "text-secondary bg-primary font-normal"
                                  : "text-black hover:text-black hover:bg-lightgray",
                                "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 w-full"
                              )}
                              type="button"
                            >
                              <item.icon
                                className={classNames("h-6 w-6 shrink-0")}
                                aria-hidden="true"
                              />
                              {item.name}
                            </button>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                          Your teams
                        </div>

                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {services?.map((item, i) => (
                            <button
                              key={i}
                              onClick={() => handleNavigationClick(item)}
                              className={classNames(
                                item?.href === active
                                  ? "text-secondary bg-primary font-normal "
                                  : "text-black hover:text-black hover:bg-lightgray",
                                " flex items-center gap-x-3 rounded-md p-2 text-sm w-full "
                              )}
                            >
                              <item.icon
                                className={classNames("h-6 w-6 shrink-0")}
                                aria-hidden="true"
                              />
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
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col ">
        <div
          className="flex grow flex-col gap-y-5 overflow-y-auto  bg-white px-4"
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
                      key={i}
                      onClick={() => handleNavigationClick(item)}
                      className={classNames(
                        item?.href === active
                          ? "text-secondary bg-primary font-normal"
                          : "text-black hover:text-black hover:bg-lightgray",
                        "group  flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 w-full"
                      )}
                      type="button" // Add type="button" to prevent form submission behavior
                    >
                      <item.icon
                        className={classNames("h-6 w-6 shrink-0")}
                        aria-hidden="true"
                      />
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
                      key={i}
                      onClick={() => handleNavigationClick(item)}
                      className={classNames(
                        item?.href === active
                          ? "text-secondary bg-primary font-normal"
                          : "text-black hover:text-black hover:bg-lightgray",
                        "group items-center flex gap-x-3 rounded-md p-2 text-sm w-full"
                      )}
                    >
                      <item.icon
                        className={classNames("h-6 w-6 shrink-0")}
                        aria-hidden="true"
                      />
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
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>

      <main className="relative pt-12 pb-11 lg:pl-64 ">
        <div className="absolute right-2 top-2">
          <OrganizationSwitcher />
        </div>
        <div className=" px-4 sm:px-6 lg:px-7 h-[90vh]">{children}</div>
      </main>
    </div>
  );
};

export default Sidenav;
