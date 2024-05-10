/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { useApi } from "./useApi";
import { useOrganization, useUser } from "@clerk/nextjs";
import { GlobalStateType, SuiteType } from "../utils/typesInterface";
import { GlobalStateContext } from "../globalState";

const useDuplicateSuite = () => {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { copySuite } = useContext(GlobalStateContext) as GlobalStateType;
  const { request } = useApi();

  const duplicateSuite = useCallback(
    async (suiteId: string, suiteLists: SuiteType[]) => {
      setIsLoading(true);
      try {
        const data = await request({
          url: `/v1/suites/${suiteId}/copy`,
          method: "POST",
        });
        copySuite(data, suiteLists);
      } catch (error: any) {
        console.error({ error });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { duplicateSuite, isLoading };
};

export default useDuplicateSuite;
