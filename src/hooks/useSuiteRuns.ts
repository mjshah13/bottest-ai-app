/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from "react";
import { TestRunType } from "../utils/typesInterface";
import { useApi } from "./useApi";
import { useUser } from "@clerk/nextjs";

interface SuiteDataType {
  environment_id: string;
  id: string;
  completed_at: string;
  status?: string;
  suite_run_id: string;
  initiation_type?: string;
}

const useSuiteRuns = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suiteTestRuns, setSuiteTestRuns] = useState<TestRunType[]>([]);
  const [suitesData, setSuitesData] = useState<SuiteDataType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useUser();

  const { request } = useApi();

  const fetchSuiteRuns = useCallback(
    async (
      suite: string | null,
      environmentId: string | null,
      page: number = 1,
      limit: number = 1
    ) => {
      setIsLoading(true);
      if (!user?.id) {
        return;
      }
      let query = `?limit=${limit}&page=${page}`;
      if (environmentId) {
        query = `${query}&environment_id=${environmentId}`;
      }

      try {
        const data = await request({
          url: `/v1/suites/${suite}/suite_runs${query}`,
          method: "GET",
        });

        setSuitesData(data?.data);
        setTotalPages(data?.pagination?.total_pages);
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

  return { suiteTestRuns, fetchSuiteRuns, totalPages, isLoading, suitesData };
};

export default useSuiteRuns;
