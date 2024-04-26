import { useState, useCallback } from "react";
import { TestRuns } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

const useTestRun = () => {
  const { organization } = useOrganization();
  const [getTestRuns, setTestRuns] = useState<TestRuns[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchTestRuns = useCallback(
    async (test_Id: string) => {
      setIsLoading(true);
      try {
        const data = await request({
          url: `/v1/test_runs/${test_Id}`,
          method: "GET",
        });

        setTestRuns(data?.variant_runs);
      } catch (error: any) {
        console.error({ error });
        setIsLoading(true);
        setError(error);
      } finally {
        setIsLoading(true);
      }
    },
    [user, organization]
  );

  return { fetchTestRuns, getTestRuns, error, isLoading };
};

export default useTestRun;
