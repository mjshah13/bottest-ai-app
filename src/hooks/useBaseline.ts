import { useState, useCallback, useContext } from "react";
import { Baseline, GlobalStateType, SuiteType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { GlobalStateContext } from "../globalState";
import { tree } from "next/dist/build/templates/app-page";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useBaseline = () => {
  const [baselines, setBaselines] = useState<Baseline[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { organization } = useOrganization();
  const { user } = useUser();
  const [error, setError] = useState<Error | null>(null);

  const { request } = useApi();

  const fetchBaseline = useCallback(
    async (test_Id: string) => {
      setIsLoading(true);
      try {
        const data = await request({
          url: `/v1/tests/${test_Id}/baselines`,
          method: "GET",
        });

        setBaselines(data?.data);
      } catch (error: any) {
        console.error({ error });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { fetchBaseline, baselines, error, isLoading };
};

export default useBaseline;
