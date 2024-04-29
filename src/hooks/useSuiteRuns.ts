/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from "react";
import { TestRunType } from "../utils/typesInterface";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";

const useSuiteRuns = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suiteTestRuns, setSuiteTestRuns] = useState<TestRunType[]>([]);
  const { user } = useUser();

  const { request } = useApi();

  const fetchSuiteRuns = useCallback(
    async (suite: string | null, environmentId: string | null) => {
      setIsLoading(true);
      if (!user?.id) {
        return;
      }
      let query = "";
      if (environmentId) {
        query = `?environment_id=${environmentId}&limit=1`;
      }

      try {
        const data = await request({
          url: `/v1/suites/${suite}/suite_runs${query}`,
          method: "GET",
        });

        setSuiteTestRuns(data?.data?.[0]?.test_runs || []);
      } catch (error: any) {
        console.error({ error });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  return { suiteTestRuns, fetchSuiteRuns, isLoading };
};

export default useSuiteRuns;
