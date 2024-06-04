/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";

const useSpecificSuiteRun = () => {
  const { organization } = useOrganization();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { user } = useUser();
  const { request } = useApi();

  const fetchSpecificSuiteRuns = useCallback(
    async (suite_run_id: string) => {
      try {
        setIsLoading(true);
        const data = await request({
          url: `/v1/suite_runs/${suite_run_id}`,
          method: "GET",
        });
        setSuccess(true);
        setError(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { fetchSpecificSuiteRuns, error, setError, isLoading, success };
};

export default useSpecificSuiteRun;
