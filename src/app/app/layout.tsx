"use client";
import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Sidenav from "../components/sidenav";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative lg:flex w-full">
      <Sidenav />
      <main className="bg-[#fdfcfa] w-full">
        <div className="">
          <div className="fixed w-full pt-2 ">
            <div
              className="w-full bg-white h-[45px] flex items-center"
              style={{ boxShadow: "0px 1px 1px 0px rgba(102, 106, 110, 0.08)" }}
            >
              <div className="absolute right-72">
                <OrganizationSwitcher />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:px-6 lg:px-7 h-[90vh] w-full">{children}</div>
      </main>
    </div>
  );
}

export default Layout;

// fdfcf
