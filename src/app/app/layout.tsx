"use client";
import React, { useContext, useEffect, useState } from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Sidenav from "../components/sidenav";
import useBots from "../../hooks/useBots";
import useSuites from "../../hooks/useSuites";
import useEnvironment from "../../hooks/useEnvironment";
import { GlobalStateType, Option } from "../../utils/typesInterface";
import { GlobalStateContext } from "../../globalState";

function Layout({ children }: { children: React.ReactNode }) {
  const { botLists } = useContext(
    GlobalStateContext
  ) as GlobalStateType;

  useBots();
  const { fetchSuites } = useSuites();
  const { fetchEnvironment } = useEnvironment();

  useEffect(() => {
    if (!botLists) return;
    fetchSuites(botLists[0]?.id);
    fetchEnvironment(botLists[0]?.id);
  }, [botLists]);

  

  return (
    <div className="relative lg:flex w-full h-full ">
      <div className="w-[260px] ">
        <Sidenav />
      </div>
      <main className="main-content h-full  bg-[#fdfcfa] dark:bg-[#2a2d30]">
        <div className="flex flex-col">
          <div className="fixed  w-full z-50">
            <div
              className=" bg-white dark:bg-[#212427] h-[72px]  flex items-center "
              style={{
                boxShadow: "0px 1px 1px 0px rgba(102, 106, 110, 0.08)",
              }}
            >
              <div className="absolute  right-72">
                <OrganizationSwitcher
                  appearance={{
                    elements: {
                      organizationSwitcherTrigger: "p-2 ",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:px-6 lg:px-7 w-full ">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
