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

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [botLists, setBotLists] = useState<BotType[]>([]);
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

  const updateBotRow = (updatedBot: BotType, botList: BotType[]) => {
    setBotLists(
      botList.map((bot) => (bot.id === updatedBot.id ? updatedBot : bot))
    );
  };
  const addBotRow = (addedBot: BotType, botList: BotType[]) => {
    setBotLists([...botList, addedBot]);
  };
  const deleteBotRow = (deletedBot: string, botList: BotType[]) => {
    setBotLists(botList.filter((bot) => bot.id !== deletedBot));
  };
  const contextValue: GlobalStateType = {
    botLists,
    setBotLists,
    updateBotRow,
    addBotRow,
    deleteBotRow,
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
