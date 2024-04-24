import { useState, useCallback } from "react";
import { TestRuns } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

const useTestRun = () => {
  const { organization } = useOrganization();
  const [getTestRuns, setTestRuns] = useState<TestRuns[]>([]);

  const [error, setError] = useState<Error | null>(null);
  const { user } = useUser();
  const { request } = useApi();
  const fetchTestRuns = useCallback(
    async (test_Id: string) => {
      try {
        const data = await request({
          url: `/v1/test_runs/${test_Id}`,
          method: "GET",
        });

        setTestRuns(data?.variant_runs);
      } catch (error: any) {
        console.error({ error });
        setError(error);
      }
    },
    [user, organization]
  );

  return { fetchTestRuns, getTestRuns, error };
};

export default useTestRun;
