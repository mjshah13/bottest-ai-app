/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
    async (suiteID: string, data: any, suiteLists: SuiteType[]) => {
      try {
        const {
          id,
          name,
          default_success_criteria,
          default_variant_count,
          default_iteration_count,
        } = await request({
          url: `/v1/suites/${suiteID}`,
          method: "PATCH",
          data,
        });
        updateSuiteRow(
          {
            id,
            name,
            default_success_criteria,
            default_variant_count,
            default_iteration_count,
          },
          suiteLists
        );
      } catch (error: any) {
        console.error({ error });
      }
    },
    [user]
  );

  return { updateSuite, isLoading };
};

export default useUpdateSuite;
