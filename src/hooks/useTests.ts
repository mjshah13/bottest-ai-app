import { useState, useCallback } from "react";
import { TestType } from "../utils/typesInterface";
import { useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { enrichDataWithLastTests } from "../utils/common";
import useTestsDetails from "./useTestDetails";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useTests = () => {
  const [testData, setTestData] = useState<TestType[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();
  const { fetchTestDetails } = useTestsDetails();

  const { request } = useApi();
  const fetchTests = useCallback(
    async (suite: string, environmentId: string) => {
      if (!user?.id) {
        return;
      }
      try {
        setIsLoading(true);
        const data = await request({
          url: `/v1/suites/${suite}/tests`,
          method: "GET",
        });
        const enhancedData = await enrichDataWithLastTests(
          data?.data,
          fetchTestDetails,
          environmentId
        );
        setTestData(enhancedData);
      } catch (error) {
        setIsLoading(false);
        console.error({ error });
      } finally {
        setIsLoading(false);
      }
    },
    [user?.id]
  );

  return { testData, fetchTests, error, isLoading };
};

export default useTests;
