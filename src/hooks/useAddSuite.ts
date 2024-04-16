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
    async (data: any, suiteLists: SuiteType[]) => {
      try {
        const {
          id,
          name,
          default_success_criteria,
          default_variant_count,
          default_iteration_count,
        } = await request({
          url: `/v1/suites`,
          method: "POST",
          data,
        });
        addSuiteRow(
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
    [user, organization]
  );

  return { addSuite, isLoading };
};

export default useAddSuite;
