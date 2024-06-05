"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { homeNavData } from "../../../utils/common";
import { AlignJustify, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useAuth, useClerk } from "@clerk/nextjs";

const HomeHeader = () => {
  const { userId } = useAuth();
  const { signOut } = useClerk();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [activeSub, setActiveSub] = useState("");

  const [selectedNav, setSelectedNav] = useState("");

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 0) {
        document.getElementById("app-header")?.classList.add("scrolled");
      } else {
        document.getElementById("app-header")?.classList.remove("scrolled");
      }
    };
    handleScrollEvent();
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <>
      <div
        className="fixed w-fit lg:w-[95%] rounded-xl lg:rounded-[20px] top-2.5 max-w-[1440px] px-8 py-[15px] flex z-40 items-center justify-end lg:justify-between bg-white right-3 md:right-8 lg:right-auto left-auto lg:left-[50%] lg:translate-x-[-50%]"
        id="app-header"
      >
        <Link
          className="transition-all duration-500 overflow-hidden w-[126px] logo-img"
          href={"/"}
        >
          <Image
            src="/Assets/Logo.svg"
            alt="logo"
            width={126}
            height={28}
            className="max-w-none"
          />
        </Link>
        <div className="flex items-center">
          <div className="hidden lg:flex items-center relative space-x-12 nav-wrapper">
            {homeNavData.map((item, key) => (
              <div
                key={key}
                className="relative group"
                onMouseOver={() => {
                  setActiveSub(item.label);
                }}
                onMouseLeave={() => setActiveSub("")}
              >
                <div className="flex items-center text-sm cursor-pointer group-hover:opacity-100 opacity-70 duration-300">
                  {item.sub && <span className="mr-1">{item.label}</span>}
                  {!item.sub && (
                    <Link className="mr-1" href={item.link}>
                      {item.label}
                    </Link>
                  )}
                  {item.sub && (
                    <ChevronDown
                      size={16}
                      className="transform group-hover:translate-y-0.5 duration-300"
                    />
                  )}
                </div>
                {item.sub && (
                  <div
                    className={`pt-7 absolute left-0 transition-all duration-300 ${
                      activeSub === item.label
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-md shadow-card shadow-primary min-w-40 px-2 py-2`}
                    >
                      {item.sub.map((sub, sKey) => (
                        <Link
                          href={sub.link}
                          className="block whitespace-nowrap px-4 py-3 text-sm bg-transparent hover:bg-[#00000010] cursor-pointer transition-all duration-300 rounded-lg"
                          key={sKey}
                          target={sub?.target}
                          onClick={() => setActiveSub("")}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {userId ? (
          <div className="hidden lg:flex items-center">
            <span
              className="cursor-pointer text-sm ml-2 h-10 flex items-center justify-center rounded-lg w-[100px] border border-[#d6e6f7] hover:shadow-md duration-200"
              onClick={() => signOut({ redirectUrl: "/sign-in" })}
            >
              Sign Out
            </span>
            <Link
              href={"/app/dashboard"}
              className="cursor-pointer text-sm ml-2 h-10 flex items-center justify-center rounded-lg w-[116px] text-white header-signup-btn hover:shadow-md duration-200"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center">
            <Link
              href={"/sign-in"}
              className="cursor-pointer text-sm ml-2 h-10 flex items-center justify-center rounded-lg w-[100px] border border-[#d6e6f7] hover:shadow-md duration-200"
            >
              Log In
            </Link>
            <Link
              href={"/sign-up"}
              className="cursor-pointer text-sm ml-2 h-10 flex items-center justify-center rounded-lg w-[116px] text-white header-signup-btn hover:shadow-lg duration-200"
            >
              Sign Up
            </Link>
          </div>
        )}
        <div className="h-5 block lg:hidden bg-black opacity-50 mx-4 mobile-divider"></div>
        <div
          className="flex lg:hidden cursor-pointer"
          onClick={() => setToggleSidebar(true)}
        >
          <AlignJustify />
        </div>
      </div>
      <div
        className={`fixed flex flex-col w-full h-full max-w-[375px] z-50 top-0 transition-all duration-700 bg-white ${
          toggleSidebar
            ? "left-0 opacity-100 visible"
            : "invisible left-[-375px] opacity-0"
        }`}
      >
        <div className="border-b border-[#0001] pt-[18px] pb-2 px-5 flex items-center justify-between">
          <Link href={"/"}>
            <Image src="/Assets/Logo.svg" alt="logo" width={162} height={44} />
          </Link>
          <X
            onClick={() => setToggleSidebar(false)}
            className="cursor-pointer"
          />
        </div>
        <div className={`py-5 px-2.5`}>
          {homeNavData.map((item, key) => (
            <div
              key={key}
              className={`mobile-header-item ${toggleSidebar && "opened"}`}
            >
              {item.sub ? (
                <div
                  className={`item-wrapper flex items-center justify-between p-4 rounded-[10px] ${
                    selectedNav === item.label
                      ? "bg-[#70451a12]"
                      : "bg-transparent"
                  } mb-2 hover:bg-[#70451a12] ${
                    toggleSidebar
                      ? "translate-x-0 translate-y-0 opacity-100 blur-0 opened"
                      : "translate-y-[-30px] translate-x-[-30px] opacity-0 blur-[2px]"
                  }`}
                  onClick={() =>
                    setSelectedNav((prev) =>
                      prev === item.label ? "" : item.label
                    )
                  }
                >
                  <span className="mr-1">{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-all duration-300 ${
                      selectedNav === item.label ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              ) : (
                <Link
                  href={item.link}
                  className={`item-wrapper flex items-center justify-between p-4 rounded-[10px] bg-transparent mb-2 hover:bg-[#70451a12] ${
                    toggleSidebar
                      ? "translate-x-0 translate-y-0 opacity-100 blur-0 opened"
                      : "translate-y-[-30px] translate-x-[-30px] opacity-0 blur-[2px]"
                  }`}
                  onClick={() => setToggleSidebar(false)}
                >
                  <span className="mr-1">{item.label}</span>
                </Link>
              )}
              {item.sub && (
                <div
                  className={`transition-all duration-500 flex flex-col overflow-hidden`}
                  style={{
                    maxHeight:
                      selectedNav === item.label
                        ? item.sub.length * 56 + item.sub.length * 8
                        : 0,
                  }}
                >
                  {item.sub.map((sItem, sKey) => (
                    <Link
                      href={sItem.link}
                      target={sItem.target}
                      key={sKey}
                      className="rounded-[10px] h-14 bg-transparent mb-2 hover:bg-[#70451a12] flex items-center p-4"
                      onClick={() => setToggleSidebar(false)}
                    >
                      {sItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {userId ? (
          <div className="mt-auto flex flex-col p-[26px] mobile-nav-footer">
            <button
              className={`flex items-center mt-4 p-2.5 justify-center rounded-[5px] text-sm ${
                toggleSidebar
                  ? "translate-y-0 opacity-100 blur-0 delay-500"
                  : "translate-y-5 opacity-0 blur-[2px]"
              }`}
              onClick={() => signOut({ redirectUrl: "/sign-in" })}
            >
              Sign Out
            </button>
            <Link
              href={"/app/dashboard"}
              className={`signup flex text-white bg-[#388aeb] items-center mt-4 p-2.5 justify-center rounded-[5px] text-sm ${
                toggleSidebar
                  ? "translate-y-0 opacity-100 blur-0 delay-[600ms]"
                  : "translate-y-5 opacity-0 blur-[2px]"
              }`}
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-auto flex flex-col p-[26px] mobile-nav-footer">
            <Link
              href={"/sign-in"}
              className={`flex items-center mt-4 p-2.5 justify-center rounded-[5px] text-sm ${
                toggleSidebar
                  ? "translate-y-0 opacity-100 blur-0 delay-500"
                  : "translate-y-5 opacity-0 blur-[2px]"
              }`}
            >
              Log In
            </Link>
            <Link
              href={"/sign-up"}
              className={`signup flex text-white bg-[#388aeb] items-center mt-4 p-2.5 justify-center rounded-[5px] text-sm ${
                toggleSidebar
                  ? "translate-y-0 opacity-100 blur-0 delay-[600ms]"
                  : "translate-y-5 opacity-0 blur-[2px]"
              }`}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      <div
        className={`transition-all duration-300 fixed w-full h-full top-0 left-0 z-40 bg-[#0001] ${
          toggleSidebar ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setToggleSidebar(false)}
      ></div>
    </>
  );
};

export default HomeHeader;
