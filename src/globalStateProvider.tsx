"use client";

import React, { useState } from "react";

import {
  BaselineType,
  BotType,
  EnvironmentType,
  GlobalStateType,
  SuiteType,
  TestType,
} from "./utils/typesInterface";
import { GlobalStateContext } from "./globalState";

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [botLists, setBotLists] = useState<BotType[]>([]);
  const [suiteLists, setSuiteLists] = useState<SuiteType[]>([]);
  const [baselines, setBaselines] = useState<BaselineType[]>([]);
  const [testData, setTestData] = useState<TestType[] | null>(null);

  const [environmentLists, setEnvironmentLists] = useState<EnvironmentType[]>(
    []
  );

  const updateBotRow = (updatedBot: BotType, botList: BotType[]) => {
    setBotLists((prevbotlist) => {
      return prevbotlist?.map((bot) =>
        bot?.id === updatedBot?.id ? updatedBot : bot
      );
    });
    // setBotLists(
    //   botList.map((bot) => (bot.id === updatedBot.id ? updatedBot : bot))
    // );
  };
  const addBotRow = (addedBot: BotType, botList: BotType[]) => {
    setBotLists((prevBot) => [...prevBot, addedBot]);
  };

  const copyBot = (addedBot: BotType, botList: BotType[]) => {
    setBotLists((prevBot) => [...prevBot, addedBot]);
  };

  const deleteBotRow = (deletedBot: string, botList: BotType[]) => {
    // setBotLists(botList.filter((bot) => bot.id !== deletedBot));
    setBotLists((prevBot) => prevBot?.filter((bot) => bot.id !== deletedBot));
  };

  const updateSuiteRow = (updatedSuite: SuiteType, suiteLists: SuiteType[]) => {
    setSuiteLists((prevSuiteLists) => {
      // Map over the previous suiteLists array and update the relevant suite
      return prevSuiteLists.map((suite) =>
        suite.id === updatedSuite.id ? updatedSuite : suite
      );
    });
  };

  const addSuiteRow = (addedSuite: SuiteType, suiteLists: SuiteType[]) => {
    setSuiteLists((prevSuite) => [...prevSuite, addedSuite]);
  };
  const deleteSuiteRow = (deletedSuite: string, suiteLists: SuiteType[]) => {
    setSuiteLists((prevSuite) =>
      prevSuite.filter((suite) => suite.id !== deletedSuite)
    );
  };

  const copySuite = (addedSuite: SuiteType, suiteLists: SuiteType[]) => {
    setSuiteLists((prevSuite) => [...prevSuite, addedSuite]);
  };

  const updateEnvironmentRow = (
    updatedEnvironment: EnvironmentType,
    environmentLists: EnvironmentType[]
  ) => {
    setEnvironmentLists((prevEnvironment) => {
      return prevEnvironment?.map((environment) =>
        environment?.id === updatedEnvironment?.id
          ? updatedEnvironment
          : environment
      );
    });

    // setEnvironmentLists(
    //   environmentLists.map((environment) =>
    //     environment.id === updatedEnvironment.id
    //       ? updatedEnvironment
    //       : environment
    //   )
    // );
  };
  const addEnvironmentRow = (
    addedEnvironment: EnvironmentType,
    environmentLists: EnvironmentType[]
  ) => {
    setEnvironmentLists((prevEnvironment) => [
      ...prevEnvironment,
      addedEnvironment,
    ]);
  };
  const deleteEnvironmentRow = (
    deletedEnvironment: string,
    environmentLists: EnvironmentType[]
  ) => {
    setEnvironmentLists((prevEnvironment) =>
      prevEnvironment.filter(
        (environment) => environment.id !== deletedEnvironment
      )
    );
  };

  const deleteBaselineData = (
    deletebaseline: string,
    baselines: BaselineType[]
  ) => {
    setBaselines((prevBaseline) =>
      prevBaseline.filter((baseline) => baseline.id !== deletebaseline)
    );
  };

  const addNewBaseline = (
    addedBaseline: BaselineType,
    baselines: BaselineType[]
  ) => {
    setBaselines([...baselines, addedBaseline]);
  };

  const deleteTestRuns = (deleteTest: string, testData: TestType[]) => {
    setTestData(testData.filter((test) => test.id !== deleteTest));
  };

  const updateTestdata = (updateTest: TestType, testData: TestType[]) => {
    // setTestData(
    //   testData?.map((test) => (test?.id === updateTest?.id ? updateTest : test))
    // );
    setTestData(
      testData?.map((test) =>
        test.id === updateTest.id
          ? {
              ...test,
              ...updateTest,
            }
          : test
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
    baselines,
    setBaselines,
    deleteBaselineData,
    addNewBaseline,
    testData,
    setTestData,
    deleteTestRuns,
    updateTestdata,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};
