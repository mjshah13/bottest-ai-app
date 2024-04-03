"use client";
import React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Sidenav from "../components/sidenav";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative lg:flex w-full h-screen ">
      <Sidenav />
      <main className=" w-full  bg-[#fdfcfa]">
        <div className="">
          <div className="fixed w-full">
            <div
              className="w-full bg-white h-[72px]  flex items-center"
              style={{ boxShadow: "0px 1px 1px 0px rgba(102, 106, 110, 0.08)" }}
            >
              <div className="absolute right-72">
                <OrganizationSwitcher
                  appearance={{
                    elements: {
                      organizationSwitcherTrigger: "p-2"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:px-6 lg:px-7 w-full">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
