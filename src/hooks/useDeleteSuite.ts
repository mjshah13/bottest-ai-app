import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { GlobalStateType, SuiteType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDeleteSuite = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { deleteSuiteRow } = useContext(GlobalStateContext) as GlobalStateType;

  const { request } = useApi();

  const deleteSuite = useCallback(
    async (suiteId: string, suiteLists: SuiteType[]) => {
      try {
        const data = await request({
          url: `/v1/suites/${suiteId}`,
          method: "DELETE",
        });
        deleteSuiteRow(suiteId, suiteLists);
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user, organization]
  );

  return { deleteSuite, isLoading };
};

export default useDeleteSuite;
