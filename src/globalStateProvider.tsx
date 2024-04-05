"use client";

import React, { useState } from "react";

import {
  BotAndSuiteModalType,
  BotType,
  EnvironmentModalType,
  EnvironmentType,
  GlobalStateType,
  SuiteType,
} from "./utils/typesInterface";
import { GlobalStateContext } from "./globalState";

export const BotsProvider = ({ children }: { children: React.ReactNode }) => {
  const [botLists, setBotLists] = useState<BotType[]>([]);
  const [botModalData, setBotModalData] = useState<BotAndSuiteModalType[]>([]);
  const [suiteLists, setSuiteLists] = useState<SuiteType[]>([]);
  const [suiteModalData, setSuiteModalData] = useState<BotAndSuiteModalType[]>(
    []
  );
  const [environmentModalData, setEnvironmentModalData] = useState<
    EnvironmentModalType[]
  >([]);
  const [environmentLists, setEnvironmentLists] = useState<
    EnvironmentType[] | null
  >(null);

  const contextValue: GlobalStateType = {
    botLists,
    setBotLists,
    botModalData,
    setBotModalData,
    suiteLists,
    setSuiteLists,
    suiteModalData,
    setSuiteModalData,
    environmentModalData,
    setEnvironmentModalData,
    environmentLists,
    setEnvironmentLists,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
