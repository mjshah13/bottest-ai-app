import { useState, useCallback, useContext } from "react";
import {
  BotAndSuiteModalType,
  GlobalStateType,
  SuiteType,
} from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";
import { GlobalStateContext } from "../globalState";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useSuites = (setSelectedSuite: any) => {
  const { organization } = useOrganization();

  const { suiteLists, setSuiteLists, suiteModalData, setSuiteModalData } =
    useContext(GlobalStateContext) as GlobalStateType;

  // const [suiteLists, setSuiteLists] = useState<SuiteType[]>([]);
  // const [suiteModalData, setSuiteModalData] = useState<BotAndSuiteModalType[]>(
  //   []
  // );

  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchSuites = useCallback(
    async (userBot: string | null) => {
      if (!user?.id) {
        return;
      }
      try {
        const data = await request({
          url: `/v1/bots/${userBot}/suites`,
          method: "GET",
        });
        setSuiteModalData(
          data.data.map((bot: BotAndSuiteModalType) => ({
            id: bot.id,
            name: bot.name,
            info: `this is ${bot.name}`,
            description: "",
          }))
        );
        const selectDataItems: SuiteType[] =
          data?.data?.map(({ id, name }: SuiteType) => ({
            id,
            name,
          })) || [];
        setSuiteLists(selectDataItems);
        if (selectDataItems.length === 1) {
          // Assuming handleSelect is a function that needs to be called when there is only one bot
          setSelectedSuite(selectDataItems[0]);
        }
      } catch (error: any) {
        console.error({ error });
        setError(error);
        toast.error(`Suites: ${error?.response?.data?.message}`);
      }
    },
    [user, organization]
  );

  return { suiteLists, suiteModalData, setSuiteModalData, fetchSuites, error };
};

export default useSuites;
