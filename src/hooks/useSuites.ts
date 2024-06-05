/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback, useContext } from "react";
import { GlobalStateType, SuiteType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";
import { GlobalStateContext } from "../globalState";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useSuites = () => {
  const { organization } = useOrganization();

  const { setSuiteLists } = useContext(GlobalStateContext) as GlobalStateType;

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

        const selectDataItems: SuiteType[] =
          data?.data?.map(
            ({
              id,
              name,
              default_success_criteria,
              default_variant_count,
              default_iteration_count,
            }: SuiteType) => ({
              id,
              name,
              default_success_criteria,
              default_variant_count,
              default_iteration_count,
            })
          ) || [];
        setSuiteLists(selectDataItems);
        // setSelectedSuite(selectDataItems[0]);
      } catch (error: any) {
        console.error({ error });
        setError(error);
        toast.error(`Suites: ${error?.response?.data?.message}`);
      }
    },
    [user, organization]
  );

  return { fetchSuites, error };
};

export default useSuites;
