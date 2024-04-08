import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";
import { GlobalStateContext } from "../globalState";
import { GlobalStateType, SuiteType } from "../utils/typesInterface";

const useUpdateSuite = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { request } = useApi();
  const { user } = useUser();
  const { updateSuiteRow } = useContext(GlobalStateContext) as GlobalStateType;

  const updateSuite = useCallback(
    async (suiteID: string, name: string, suiteLists: SuiteType[]) => {
      try {
        const data = await request({
          url: `/v1/suites/${suiteID}`,
          method: "PATCH",
          data: {
            name: name,
          },
        });
        updateSuiteRow(data, suiteLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateSuite, isLoading };
};

export default useUpdateSuite;
