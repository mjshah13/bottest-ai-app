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
import { UserButton, useSession } from "@clerk/nextjs";
import { NavigationItem, ServiceItem } from "../../../utils/typesInterface";
import { useRouter } from "next/navigation";

interface NavigationIconProps {
  isActive: any;
  disabled: boolean;
}

export const AnalyticsIcon: React.FC<NavigationIconProps> = ({
  isActive,
  disabled,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g opacity="0.75">
      <path
        d="M3 3V21H21"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10H8C7.44772 10 7 10.4477 7 11V16C7 16.5523 7.44772 17 8 17H10C10.5523 17 11 16.5523 11 16V11C11 10.4477 10.5523 10 10 10Z"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 5H16C15.4477 5 15 5.44772 15 6V16C15 16.5523 15.4477 17 16 17H18C18.5523 17 19 16.5523 19 16V6C19 5.44772 18.5523 5 18 5Z"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const DashboardIcon: React.FC<NavigationIconProps> = ({ isActive }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={isActive ? "#314F8F" : "#212427"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9 22V12H15V22"
      stroke={isActive ? "#314F8F" : "#212427"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const OrganizationIcon: React.FC<NavigationIconProps> = ({
  isActive,
  disabled,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g opacity="0.75">
      <path
        d="M6 22V4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V22H6Z"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 12H4C3.46957 12 2.96086 12.2107 2.58579 12.5858C2.21071 12.9609 2 13.4696 2 14V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H6"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H18"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 6H14"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 10H14"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 14H14"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 18H14"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

export const HelpIcon: React.FC<NavigationIconProps> = ({
  isActive,
  disabled,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g opacity="0.75">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.09003 9C9.32513 8.33167 9.78918 7.7681 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15848 13.7588 7.52152 14.2151 8.06353C14.6714 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 17H12.01"
        stroke={disabled ? "#b6b8b7" : isActive ? "#314F8F" : "#212427"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: DashboardIcon,
    current: true,
    isDisabled: false,
  },
  {
    name: "Analytics",
    href: "/app/analytics",
    icon: AnalyticsIcon,
    current: false,
    isDisabled: true,
  },
  {
    name: "Organization",
    href: "/app/organization",
    icon: OrganizationIcon,
    current: false,
    isDisabled: true,
  },
];

const services: ServiceItem[] = [
  {
    id: 1,
    name: "Help",
    href: "#",
    icon: HelpIcon,
    current: false,
    isDisabled: true,
  },
  {
    id: 2,
    name: "Documentation",
    href: "",
    icon: OrganizationIcon,
    current: false,
    isDisabled: true,
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
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
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
                                "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 w-full"
                              )}
                              type="button"
                            >
                              <item.icon
                                disabled={item?.isDisabled}
                                isActive={item?.href === active}
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
                              disabled={item?.isDisabled}
                              onClick={() => handleNavigationClick(item)}
                              className={classNames(
                                item?.href === active
                                  ? "text-secondary bg-primary font-normal "
                                  : item?.isDisabled
                                  ? "text-[#b6b8b7]  hover:bg-lightgray"
                                  : "text-black hover:text-black hover:bg-lightgray",
                                " flex items-center gap-x-3 rounded-md p-2 text-sm w-full "
                              )}
                            >
                              <item.icon
                                disabled={item?.isDisabled}
                                isActive={item?.href === active}
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

      <div className="hidden h-full lg:z-50 lg:flex lg:w-64 lg:flex-col ">
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
                        "group  flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 w-full"
                      )}
                      type="button"
                    >
                      <item.icon
                        disabled={item?.isDisabled}
                        isActive={item?.href === active}
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
                      disabled={item?.isDisabled}
                      key={i}
                      onClick={() => handleNavigationClick(item)}
                      className={classNames(
                        item?.href === active
                          ? "text-secondary bg-primary font-normal"
                          : item?.isDisabled
                          ? "text-[#b6b8b7]  hover:bg-lightgray"
                          : "text-black hover:text-black hover:bg-lightgray",
                        "group items-center flex gap-x-3 rounded-md p-2 text-sm w-full"
                      )}
                    >
                      <item.icon
                        disabled={item?.isDisabled}
                        isActive={item?.href === active}
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
    </div>
  );
};

export default Sidenav;
