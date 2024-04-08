import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import { GlobalStateType, SuiteType } from "../utils/typesInterface";

const useAddSuite = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addSuiteRow } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const addSuite = useCallback(
    async (name: string, botId: string, suiteLists: SuiteType[]) => {
      try {
        const data = await request({
          url: `/v1/suites`,
          method: "POST",
          data: {
            name,
            bot_id: botId,
          },
        });
        addSuiteRow(data, suiteLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { addSuite, isLoading };
};

export default useAddSuite;
