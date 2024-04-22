"use client";

import React, { useState } from "react";

import {
  BotType,
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

  const copyBot = (addedBot: BotType, botList: BotType[]) => {
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

  const copySuite = (addedSuite: SuiteType, suiteLists: SuiteType[]) => {
    setSuiteLists([...suiteLists, addedSuite]);
  };

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
    botLists: botLists?.sort((a: BotType, b: BotType) => {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    }),
    setBotLists,
    updateBotRow,
    addBotRow,
    deleteBotRow,
    suiteLists: suiteLists?.sort((a: SuiteType, b: SuiteType) => {
      let nameA = a.name.toUpperCase(); // ignore upper and lowercase
      let nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    }),
    setSuiteLists,
    updateSuiteRow,
    deleteSuiteRow,
    addSuiteRow,
    environmentLists: environmentLists?.sort(
      (a: EnvironmentType, b: EnvironmentType) => {
        let nameA = a.name.toUpperCase(); // ignore upper and lowercase
        let nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    ),
    setEnvironmentLists,
    updateEnvironmentRow,
    addEnvironmentRow,
    deleteEnvironmentRow,
    copyBot,
    copySuite,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
