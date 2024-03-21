"use client";
import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Sidenav from "../components/sidenav";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#fdfcfa]">
      <Sidenav />
      <main className="relative pt-12 pb-11 lg:pl-64 ">
        <div className="absolute right-8 top-2 ">
          <OrganizationSwitcher />
        </div>
        <div className=" px-4 sm:px-6 lg:px-7 h-[90vh] ">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
