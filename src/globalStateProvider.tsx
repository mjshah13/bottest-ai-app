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
  const [environmentLists, setEnvironmentLists] = useState<EnvironmentType[]>(
    []
  );

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

  const updateSuiteRow = (updatedSuite: SuiteType, suiteLists: SuiteType[]) => {
    setSuiteLists(
      suiteLists.map((suite) =>
        suite.id === updatedSuite.id ? updatedSuite : suite
      )
    );
  };
  const addSuiteRow = (addedSuite: SuiteType, suiteLists: SuiteType[]) => {
    setSuiteLists([...suiteLists, addedSuite]);
  };
  const deleteSuiteRow = (deletedSuite: string, suiteLists: SuiteType[]) => {
    setSuiteLists(suiteLists.filter((suite) => suite.id !== deletedSuite));
  };

  //////////////////////////////////////////////

  const updateEnvironmentRow = (
    updatedEnvironment: EnvironmentType,
    environmentLists: EnvironmentType[]
  ) => {
    setEnvironmentLists(
      environmentLists.map((environment) =>
        environment.id === updatedEnvironment.id
          ? updatedEnvironment
          : environment
      )
    );
  };
  const addEnvironmentRow = (
    addedEnvironment: EnvironmentType,
    environmentLists: EnvironmentType[]
  ) => {
    setEnvironmentLists([...environmentLists, addedEnvironment]);
  };
  const deleteEnvironmentRow = (
    deletedEnvironment: string,
    environmentLists: EnvironmentType[]
  ) => {
    setEnvironmentLists(
      environmentLists.filter(
        (environment) => environment.id !== deletedEnvironment
      )
    );
  };

  const contextValue: GlobalStateType = {
    botLists,
    setBotLists,
    updateBotRow,
    addBotRow,
    deleteBotRow,
    suiteLists,
    setSuiteLists,
    updateSuiteRow,
    deleteSuiteRow,
    addSuiteRow,
    suiteModalData,
    setSuiteModalData,
    environmentModalData,
    setEnvironmentModalData,
    environmentLists,
    setEnvironmentLists,
    updateEnvironmentRow,
    addEnvironmentRow,
    deleteEnvironmentRow,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
