import { useState, useCallback } from "react";
import { TestType } from "../utils/typesInterface";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useApi } from "./useApi";
import { toast } from "react-toastify";

// Assuming request is a utility function you've created to make HTTP requests
// Make sure to type it accordingly

const useTests = () => {
  const [testData, setTestData] = useState<TestType[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();
  const { organization } = useOrganization();

  const { request } = useApi();
  const fetchTests = useCallback(
    async (suite: string | null, environmentId: string | null) => {
      if (!user?.id) {
        return;
      }
      let query = "";
      if (environmentId) {
        query = `?environment_id=${environmentId}`;
      }

      try {
        setIsLoading(true);
        const data = await request({
          url: `/v1/suites/${suite}/tests${query}`,
          method: "GET",
        });
        const treatedData = data?.data?.map((test: TestType) => {
          const lastTests = test?.recent_test_runs?.sort(
            (a: TestType, b: TestType) => {
              const dateA = new Date(a?.created_at);
              const dateB = new Date(b?.created_at);

              const timeA = dateA.getHours() * 60 + dateA.getMinutes();
              const timeB = dateB.getHours() * 60 + dateB.getMinutes();

              return timeA - timeB;
            }
          );
          const status = lastTests[lastTests.length - 1]?.status;
          return { ...test, status, recent_test_runs: lastTests };
        });
        setTestData(treatedData);
      } catch (error: any) {
        setIsLoading(false);
        console.error({ error });
        setTestData([]);
        toast.error(`Tests: ${error?.response?.data?.message}`);
      } finally {
        setIsLoading(false);
      }
    },
    [user, organization]
  );

  return { testData, fetchTests, error, isLoading };
};

export default useTests;
